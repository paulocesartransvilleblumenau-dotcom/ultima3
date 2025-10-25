from fastapi import FastAPI, APIRouter, HTTPException, Depends
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class AdminLogin(BaseModel):
    username: str
    password: str

class PixConfig(BaseModel):
    chave_pix: str
    tipo_chave: str  # cpf, cnpj, email, telefone, aleatoria
    nome_beneficiario: str
    cidade: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/log-access")
async def log_access(data: dict):
    """Log user access attempts (without storing passwords)"""
    try:
        log_entry = {
            "username": data.get("username"),
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "id": str(uuid.uuid4())
        }
        await db.access_logs.insert_one(log_entry)
        return {"status": "success", "message": "Access logged"}
    except Exception as e:
        logger.error(f"Error logging access: {e}")
        return {"status": "error", "message": str(e)}

# Admin Routes
@api_router.post("/admin/login")
async def admin_login(credentials: AdminLogin):
    """Admin login endpoint"""
    # Senha padrão: admin123 (em produção, usar hash)
    if credentials.username == "admin" and credentials.password == "admin123":
        return {
            "status": "success",
            "token": "admin_token_" + str(uuid.uuid4()),
            "message": "Login realizado com sucesso"
        }
    else:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

@api_router.get("/admin/pix-config")
async def get_pix_config():
    """Get current PIX configuration"""
    try:
        config = await db.pix_config.find_one({}, {"_id": 0})
        if config:
            return {"status": "success", "data": config}
        else:
            return {"status": "success", "data": None}
    except Exception as e:
        logger.error(f"Error getting PIX config: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/admin/pix-config")
async def save_pix_config(config: PixConfig):
    """Save PIX configuration"""
    try:
        config_dict = config.dict()
        config_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
        
        # Upsert configuration
        await db.pix_config.delete_many({})
        await db.pix_config.insert_one(config_dict)
        
        return {"status": "success", "message": "Configuração PIX salva com sucesso"}
    except Exception as e:
        logger.error(f"Error saving PIX config: {e}")
        raise HTTPException(status_code=500, detail=str(e))

import crcmod

def gerar_pix_payload(chave_pix: str, nome: str, cidade: str, valor: float, txid: str = "***") -> str:
    """
    Gera payload PIX no formato BRCode seguindo especificação do Banco Central
    """
    import unicodedata
    
    def remover_acentos(texto):
        """Remove acentos e caracteres especiais"""
        nfkd = unicodedata.normalize('NFKD', texto)
        return "".join([c for c in nfkd if not unicodedata.combining(c)])
    
    def criar_campo(id_campo: str, valor: str) -> str:
        """Cria um campo no formato EMV: ID + Length + Value"""
        tamanho = str(len(valor)).zfill(2)
        return f"{id_campo}{tamanho}{valor}"
    
    # Limpar nome e cidade
    nome_limpo = remover_acentos(nome).upper()[:25]
    cidade_limpa = remover_acentos(cidade).upper()[:15]
    chave_limpa = chave_pix.replace(" ", "").replace(".", "").replace("-", "").replace("/", "")
    
    # Construir payload PIX
    payload = ""
    
    # 00: Payload Format Indicator
    payload += criar_campo("00", "01")
    
    # 26: Merchant Account Information (PIX)
    merchant_account = ""
    merchant_account += criar_campo("00", "BR.GOV.BCB.PIX")
    merchant_account += criar_campo("01", chave_limpa)
    payload += criar_campo("26", merchant_account)
    
    # 52: Merchant Category Code
    payload += criar_campo("52", "0000")
    
    # 53: Transaction Currency (986 = BRL)
    payload += criar_campo("53", "986")
    
    # 54: Transaction Amount (se tiver valor)
    if valor and valor > 0:
        valor_str = f"{valor:.2f}"
        payload += criar_campo("54", valor_str)
    
    # 58: Country Code
    payload += criar_campo("58", "BR")
    
    # 59: Merchant Name
    payload += criar_campo("59", nome_limpo)
    
    # 60: Merchant City
    payload += criar_campo("60", cidade_limpa)
    
    # 62: Additional Data Field Template
    if txid:
        additional_data = criar_campo("05", txid)
        payload += criar_campo("62", additional_data)
    
    # 63: CRC16 (será calculado)
    payload += "6304"
    
    # Calcular CRC16
    crc16_func = crcmod.mkCrcFun(0x11021, initCrc=0xFFFF, rev=False, xorOut=0x0000)
    crc_value = crc16_func(payload.encode('utf-8'))
    crc_hex = format(crc_value, '04X')
    
    # Adicionar CRC ao final
    payload += crc_hex
    
    return payload

@api_router.get("/pix/generate-code")
async def generate_pix_code(amount: float):
    """Generate PIX code based on configuration"""
    try:
        config = await db.pix_config.find_one({}, {"_id": 0})
        
        if not config:
            raise HTTPException(status_code=404, detail="Configuração PIX não encontrada")
        
        # Gerar payload PIX manualmente
        pix_code = gerar_pix_payload(
            chave_pix=config['chave_pix'],
            nome=config['nome_beneficiario'],
            cidade=config['cidade'],
            valor=amount,
            txid='***'
        )
        
        logger.info(f"PIX gerado manualmente - Chave: {config['chave_pix']}, Nome: {config['nome_beneficiario']}, Valor: {amount}")
        logger.info(f"Payload: {pix_code}")
        
        return {
            "status": "success",
            "pix_code": pix_code,
            "chave_pix": config['chave_pix'],
            "nome_beneficiario": config['nome_beneficiario'],
            "valor": amount
        }
    except Exception as e:
        logger.error(f"Error generating PIX code: {e}")
        import traceback
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()