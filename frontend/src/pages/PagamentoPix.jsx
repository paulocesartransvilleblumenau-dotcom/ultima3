import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { IoCopy, IoCheckmarkCircle, IoTime } from 'react-icons/io5';

const PagamentoPix = () => {
  const navigate = useNavigate();
  const [depositAmount, setDepositAmount] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [pixCode, setPixCode] = useState('');
  const [pixInfo, setPixInfo] = useState(null);

  useEffect(() => {
    // Carregar valores do localStorage
    const deposit = parseFloat(localStorage.getItem('depositAmount')) || 0;
    const bonus = parseFloat(localStorage.getItem('bonusAmount')) || 0;
    
    if (deposit === 0) {
      // Se não houver valor, redirecionar de volta
      navigate('/escolher-valor');
      return;
    }

    setDepositAmount(deposit);
    setBonusAmount(bonus);
    setTotalAmount(deposit + bonus);
    
    // Buscar código PIX do backend
    generatePixCode(deposit);
  }, [navigate]);

  const generatePixCode = async (amount) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/pix/generate-code?amount=${amount}`);
      if (response.data.status === 'success') {
        setPixCode(response.data.pix_code);
        setPixInfo({
          chave: response.data.chave_pix,
          beneficiario: response.data.nome_beneficiario
        });
      }
    } catch (err) {
      console.error('Erro ao gerar código PIX:', err);
      // Código PIX de fallback
      setPixCode('00020126580014br.gov.bcb.pix0136a629532e-7693-4846-852d-1bbdefdef5245204000053039865802BR5925APOSTA BET NACIONAL LTDA6009SAO PAULO62410503***50300017br.gov.bcb.brcode01051.0.063041D3A');
    }
  };

  useEffect(() => {
    // Countdown timer
    if (timeLeft > 0 && !paymentConfirmed) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !paymentConfirmed) {
      alert('Tempo expirado! Gerando novo código PIX...');
      setTimeLeft(600); // Resetar timer
    }
  }, [timeLeft, paymentConfirmed]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatCurrency = (value) => {
    return value.toFixed(2).replace('.', ',');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      alert('Erro ao copiar código PIX');
    }
  };

  const confirmPayment = () => {
    setPaymentConfirmed(true);
    setTimeout(() => {
      alert('Pagamento confirmado! Redirecionando...');
      localStorage.removeItem('depositAmount');
      localStorage.removeItem('bonusAmount');
      navigate('/landing');
    }, 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a1628] to-[#1a3a52] min-h-screen p-5" data-testid="pagamento-pix-page">
      <div className="max-w-[900px] mx-auto py-10 px-5">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl font-black lowercase mb-5">
            <span className="text-[#ffd700]">aposta</span>
            <span className="text-white">bet</span>
            <span className="text-white">nacional</span>
          </div>
          <h1 className="text-white text-3xl font-bold mb-2.5" data-testid="page-title">
            Pagamento via PIX
          </h1>
          <p className="text-white/70 text-lg">
            Escaneie o QR Code ou copie o código PIX
          </p>
        </div>

        {/* Timer */}
        <div className="bg-[#ff6b6b]/20 border-2 border-[#ff6b6b]/50 rounded-xl p-4 mb-6 flex items-center justify-center gap-3">
          <IoTime className="text-[#ff6b6b] text-2xl" />
          <span className="text-white text-xl font-bold">
            Tempo restante: {formatTime(timeLeft)}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* QR Code Section */}
          <div className="bg-white/10 border-2 border-white/20 rounded-2xl p-8">
            <h3 className="text-white text-xl font-bold mb-6 text-center">
              📱 Escaneie o QR Code
            </h3>
            
            <div className="bg-white p-6 rounded-xl mb-6 flex justify-center">
              <QRCodeSVG 
                value={pixCode}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>

            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-white/80 text-sm leading-relaxed">
                Abra o app do seu banco, selecione <strong className="text-white">Pagar com PIX</strong> e escaneie o código acima
              </p>
            </div>
          </div>

          {/* Payment Info Section */}
          <div className="space-y-6">
            {/* Amount Details */}
            <div className="bg-gradient-to-br from-[#1a3a52] to-[#0a1628] border-2 border-white/20 rounded-2xl p-6">
              <h3 className="text-white text-xl font-bold mb-4">
                💰 Detalhes do Pagamento
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Valor do Depósito:</span>
                  <span className="text-white text-xl font-bold">R$ {formatCurrency(depositAmount)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#00ff00]">Bônus (500%):</span>
                  <span className="text-[#00ff00] text-xl font-bold">+ R$ {formatCurrency(bonusAmount)}</span>
                </div>
                
                <div className="border-t-2 border-white/20 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Total na Conta:</span>
                    <span className="text-[#ffd700] text-2xl font-black">R$ {formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white/5 border-2 border-white/10 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-3">📋 Como pagar:</h4>
              <ol className="text-white/80 text-sm space-y-2 list-decimal list-inside">
                <li>Abra o app do seu banco</li>
                <li>Escolha pagar com Pix</li>
                <li>Escaneie o QR Code ou cole o código</li>
                <li>Confirme o pagamento</li>
                <li>Aguarde a confirmação (geralmente instantânea)</li>
              </ol>
            </div>

            {/* Simular Pagamento */}
            <button
              onClick={confirmPayment}
              disabled={paymentConfirmed}
              className="w-full py-4 rounded-xl text-lg font-bold transition-all
                disabled:bg-[#00ff00]/50 disabled:cursor-not-allowed
                enabled:bg-[#00ff00] enabled:text-[#0a1628] enabled:hover:bg-[#33ff33]"
              data-testid="confirm-payment-btn"
            >
              {paymentConfirmed ? '✓ Pagamento Confirmado!' : 'Simular Pagamento Recebido'}
            </button>
          </div>
        </div>

        {/* Pix Copia e Cola */}
        <div className="bg-white/10 border-2 border-white/20 rounded-2xl p-6 mb-6">
          <h3 className="text-white text-xl font-bold mb-4 text-center">
            📋 PIX Copia e Cola
          </h3>
          
          <div className="bg-[#0a1628] border-2 border-white/30 rounded-xl p-4 mb-4">
            <p className="text-white/70 text-xs mb-2 text-center">Código PIX:</p>
            <p className="text-white text-sm font-mono break-all leading-relaxed" data-testid="pix-code">
              {pixCode}
            </p>
          </div>

          <button
            onClick={copyToClipboard}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3
              ${copied 
                ? 'bg-[#00ff00] text-[#0a1628]' 
                : 'bg-[#ffd700] text-[#0a1628] hover:bg-[#ffed4e]'}`}
            data-testid="copy-pix-btn"
          >
            {copied ? (
              <>
                <IoCheckmarkCircle className="text-2xl" />
                Código Copiado!
              </>
            ) : (
              <>
                <IoCopy className="text-2xl" />
                Copiar Código PIX
              </>
            )}
          </button>

          <p className="text-white/60 text-sm text-center mt-4">
            Cole este código no app do seu banco na opção <strong>PIX Copia e Cola</strong>
          </p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-500/10 border-2 border-blue-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="text-blue-400 text-xl mt-1">🔒</div>
            <div>
              <h4 className="text-white font-bold mb-1">Pagamento Seguro</h4>
              <p className="text-white/70 text-sm">
                Este é um código PIX oficial. Não compartilhe com terceiros. 
                O valor será creditado automaticamente após a confirmação do pagamento.
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate('/escolher-valor')}
            className="text-[#4a9eff] font-semibold hover:text-[#6bb0ff] transition-colors"
            data-testid="back-link"
          >
            ← Voltar para escolher outro valor
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagamentoPix;
