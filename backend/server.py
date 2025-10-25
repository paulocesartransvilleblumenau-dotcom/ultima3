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

@api_router.get("/pix/generate-code")
async def generate_pix_code(amount: float):
    """Generate PIX code based on configuration"""
    try:
        from pixqrcodegen import Payload
        import unicodedata
        
        config = await db.pix_config.find_one({}, {"_id": 0})
        
        if not config:
            raise HTTPException(status_code=404, detail="Configuração PIX não encontrada")
        
        # Função para remover acentos
        def remover_acentos(texto):
            nfkd = unicodedata.normalize('NFKD', texto)
            texto_sem_acento = "".join([c for c in nfkd if not unicodedata.combining(c)])
            return texto_sem_acento.upper()
        
        # Preparar dados sem acentos
        nome_limpo = remover_acentos(config['nome_beneficiario'])[:25]
        cidade_limpa = remover_acentos(config['cidade'])[:15]
        valor_str = f"{amount:.2f}"  # Formato: 100.00
        
        # Criar payload PIX usando pixqrcodegen
        payload = Payload(
            nome=nome_limpo,
            chavepix=config['chave_pix'],
            valor=valor_str,
            cidade=cidade_limpa,
            txtId='***'
        )
        
        # Gerar código PIX EMV válido
        pix_code = payload.gerarPayload()
        
        logger.info(f"PIX gerado - Nome: {nome_limpo}, Chave: {config['chave_pix']}, Valor: {valor_str}, Cidade: {cidade_limpa}")
        
        return {
            "status": "success",
            "pix_code": pix_code,
            "chave_pix": config['chave_pix'],
            "nome_beneficiario": nome_limpo,
            "valor": amount
        }
    except Exception as e:
        logger.error(f"Error generating PIX code: {e}")
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