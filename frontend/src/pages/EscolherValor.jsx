import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EscolherValor = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(0);
  const [customValue, setCustomValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [showBonusPreview, setShowBonusPreview] = useState(false);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const presetValues = [
    { amount: 100, bonus: 500 },
    { amount: 200, bonus: 1000 },
    { amount: 300, bonus: 1500 },
    { amount: 500, bonus: 2500 },
    { amount: 1000, bonus: 5000 }
  ];

  const selectValue = (amount) => {
    setSelectedValue(amount);
    setCustomValue('');
    setShowError(false);
    calculateBonus(amount);
  };

  const handleCustomInput = (e) => {
    const value = e.target.value;
    setCustomValue(value);
    setSelectedValue(0);
    
    const amount = parseFloat(value) || 0;
    
    if (amount > 0 && amount < 100) {
      setShowError(true);
      setShowBonusPreview(false);
    } else if (amount >= 100) {
      setShowError(false);
      setSelectedValue(amount);
      calculateBonus(amount);
    } else {
      setShowError(false);
      setShowBonusPreview(false);
      setSelectedValue(0);
    }
  };

  const calculateBonus = (amount) => {
    const bonus = Math.min(amount * 5, 5000);
    const total = amount + bonus;
    setBonusAmount(bonus);
    setTotalAmount(total);
    setShowBonusPreview(true);
  };

  const confirmDeposit = () => {
    if (selectedValue < 100) {
      alert('Por favor, selecione um valor mínimo de R$ 100,00');
      return;
    }
    
    const bonus = Math.min(selectedValue * 5, 5000);
    localStorage.setItem('depositAmount', selectedValue);
    localStorage.setItem('bonusAmount', bonus);
    
    // Redirecionar para página de pagamento
    navigate('/pagamento-pix');
  };

  const formatCurrency = (value) => {
    return value.toFixed(2).replace('.', ',');
  };

  const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-[#0a1628] to-[#1a3a52] min-h-screen p-5" data-testid="escolher-valor-page">
      <div className="max-w-[800px] mx-auto py-10 px-5">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-4xl font-black lowercase mb-5">
            <span className="text-[#ffd700]">aposta</span>
            <span className="text-white">bet</span>
            <span className="text-white">nacional</span>
          </div>
          <h1 className="text-white text-3xl font-bold mb-2.5" data-testid="page-title">
            Escolha o Valor do Depósito
          </h1>
          <p className="text-white/70 text-lg">
            Deposite e ganhe 500% de bônus instantaneamente!
          </p>
        </div>

        {/* Bonus Banner */}
        <div className="bg-gradient-to-br from-[#ffd700] to-[#ffed4e] text-[#0a1628] p-5 rounded-2xl text-center mb-10 shadow-[0_8px_20px_rgba(255,215,0,0.3)]">
          <h3 className="text-3xl font-black mb-1">🎁 500% DE BÔNUS</h3>
          <p className="text-base font-semibold">
            Deposite acima de R$ 100 e ganhe até R$ 5.000 de bônus!
          </p>
        </div>

        {/* Value Options */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {presetValues.map((preset) => (
            <div
              key={preset.amount}
              onClick={() => selectValue(preset.amount)}
              className={`bg-white/10 border-2 rounded-2xl p-6 text-center cursor-pointer transition-all relative
                hover:bg-white/15 hover:border-[#ffd700] hover:-translate-y-1
                ${selectedValue === preset.amount ? 'bg-[rgba(255,215,0,0.2)] border-[#ffd700] border-[3px]' : 'border-white/20'}`}
              data-testid={`value-card-${preset.amount}`}
            >
              <div className="text-white text-3xl font-black mb-2.5">
                R$ {formatNumber(preset.amount)}
              </div>
              <div className="text-[#00ff00] text-sm font-bold">
                + R$ {formatNumber(preset.bonus)}
              </div>
            </div>
          ))}
        </div>

        {/* Custom Input Section */}
        <div className="bg-white/5 border-2 border-dashed border-white/30 rounded-2xl p-8 mb-8">
          <h4 className="text-white text-xl font-bold mb-4 text-center">
            💵 Outro Valor
          </h4>
          <div className="relative max-w-[400px] mx-auto">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white text-2xl font-bold">
              R$
            </span>
            <input
              type="number"
              value={customValue}
              onChange={handleCustomInput}
              className="w-full py-5 pl-16 pr-5 bg-white/10 border-2 border-white/20 rounded-xl text-white text-3xl font-bold text-center
                focus:outline-none focus:bg-white/15 focus:border-[#ffd700]"
              placeholder="Digite o valor"
              min="100"
              step="0.01"
              data-testid="custom-value-input"
            />
          </div>

          {/* Error Message */}
          {showError && (
            <div className="text-[#ff4444] text-center mt-2.5 font-semibold" data-testid="error-message">
              ⚠️ O valor mínimo de depósito é R$ 100,00
            </div>
          )}

          {/* Bonus Preview */}
          {showBonusPreview && (
            <div className="bg-[rgba(0,255,0,0.1)] border-2 border-[rgba(0,255,0,0.3)] rounded-xl p-5 mt-5 text-center" data-testid="bonus-preview">
              <div className="text-white/70 text-sm mb-1">Você receberá:</div>
              <div className="text-[#00ff00] text-2xl font-black">
                + R$ {formatCurrency(bonusAmount)} de bônus
              </div>
              <div className="text-white text-xl font-bold mt-2.5">
                Total: R$ {formatCurrency(totalAmount)}
              </div>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={confirmDeposit}
          disabled={selectedValue < 100}
          className="w-full max-w-[500px] mx-auto block py-5 rounded-[50px] text-2xl font-black uppercase transition-all
            disabled:bg-white/20 disabled:text-white/50 disabled:cursor-not-allowed
            enabled:bg-[#00ff00] enabled:text-[#0a1628] enabled:hover:bg-[#33ff33] enabled:hover:-translate-y-1"
          data-testid="continue-btn"
        >
          Continuar para Pagamento
        </button>

        {/* Back Link */}
        <div className="text-center mt-5">
          <button
            onClick={() => navigate('/landing')}
            className="text-[#4a9eff] font-semibold hover:text-[#6bb0ff] transition-colors"
            data-testid="back-link"
          >
            ← Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EscolherValor;
