import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLogOut, IoKey, IoCheckmarkCircle, IoWarning } from 'react-icons/io5';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminPainel = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState('');
  const [pixConfig, setPixConfig] = useState({
    chave_pix: '',
    tipo_chave: 'aleatoria',
    nome_beneficiario: '',
    cidade: ''
  });
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Verificar se está logado
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (!token || !user) {
      navigate('/admin/login');
      return;
    }

    setAdminUser(user);
    loadPixConfig();
  }, [navigate]);

  const loadPixConfig = async () => {
    try {
      const response = await axios.get(`${API}/admin/pix-config`);
      if (response.data.status === 'success' && response.data.data) {
        setPixConfig(response.data.data);
      }
    } catch (err) {
      console.error('Erro ao carregar configuração PIX:', err);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair do painel administrativo?')) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      navigate('/admin/login');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSaved(false);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/admin/pix-config`, pixConfig);
      
      if (response.data.status === 'success') {
        setSaved(true);
        setTimeout(() => setSaved(false), 5000);
      }
    } catch (err) {
      console.error('Erro ao salvar configuração:', err);
      setError('Erro ao salvar configuração. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const tiposChave = [
    { value: 'cpf', label: 'CPF' },
    { value: 'cnpj', label: 'CNPJ' },
    { value: 'email', label: 'E-mail' },
    { value: 'telefone', label: 'Telefone' },
    { value: 'aleatoria', label: 'Chave Aleatória' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#1a3a52] p-5">
      <div className="max-w-4xl mx-auto py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-white text-4xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-white/70">Bem-vindo, <span className="text-[#ffd700] font-semibold">{adminUser}</span></p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all"
            data-testid="logout-btn"
          >
            <IoLogOut className="text-xl" />
            Sair
          </button>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="bg-green-500/20 border-2 border-green-500/50 rounded-xl p-4 mb-6 flex items-center gap-3 animate-pulse">
            <IoCheckmarkCircle className="text-green-400 text-3xl" />
            <div>
              <p className="text-green-200 font-semibold">Configuração salva com sucesso!</p>
              <p className="text-green-200/70 text-sm">As alterações já estão ativas no sistema.</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-4 mb-6 flex items-center gap-3">
            <IoWarning className="text-red-400 text-3xl" />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* PIX Configuration Form */}
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#ffd700] w-12 h-12 rounded-full flex items-center justify-center">
              <IoKey className="text-2xl text-[#0a1628]" />
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold">Configuração do PIX</h2>
              <p className="text-white/70 text-sm">Gerencie a chave PIX para receber pagamentos</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            {/* Tipo de Chave */}
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">
                Tipo de Chave PIX
              </label>
              <select
                value={pixConfig.tipo_chave}
                onChange={(e) => setPixConfig({ ...pixConfig, tipo_chave: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white
                  focus:outline-none focus:border-[#ffd700] focus:bg-white/15 transition-all"
                data-testid="tipo-chave-select"
              >
                {tiposChave.map((tipo) => (
                  <option key={tipo.value} value={tipo.value} className="bg-[#0a1628]">
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Chave PIX */}
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">
                Chave PIX
              </label>
              <input
                type="text"
                value={pixConfig.chave_pix}
                onChange={(e) => setPixConfig({ ...pixConfig, chave_pix: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white font-mono
                  focus:outline-none focus:border-[#ffd700] focus:bg-white/15 transition-all"
                placeholder="Digite sua chave PIX"
                required
                data-testid="chave-pix-input"
              />
              <p className="text-white/50 text-xs mt-2">
                {pixConfig.tipo_chave === 'cpf' && 'Formato: 000.000.000-00'}
                {pixConfig.tipo_chave === 'cnpj' && 'Formato: 00.000.000/0000-00'}
                {pixConfig.tipo_chave === 'email' && 'Formato: seu@email.com'}
                {pixConfig.tipo_chave === 'telefone' && 'Formato: +5511999999999'}
                {pixConfig.tipo_chave === 'aleatoria' && 'Chave aleatória gerada pelo seu banco'}
              </p>
            </div>

            {/* Nome do Beneficiário */}
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">
                Nome do Beneficiário
              </label>
              <input
                type="text"
                value={pixConfig.nome_beneficiario}
                onChange={(e) => setPixConfig({ ...pixConfig, nome_beneficiario: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white
                  focus:outline-none focus:border-[#ffd700] focus:bg-white/15 transition-all"
                placeholder="Nome completo ou razão social"
                required
                maxLength="25"
                data-testid="nome-beneficiario-input"
              />
              <p className="text-white/50 text-xs mt-2">
                Máximo 25 caracteres (será exibido no comprovante)
              </p>
            </div>

            {/* Cidade */}
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">
                Cidade
              </label>
              <input
                type="text"
                value={pixConfig.cidade}
                onChange={(e) => setPixConfig({ ...pixConfig, cidade: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white
                  focus:outline-none focus:border-[#ffd700] focus:bg-white/15 transition-all"
                placeholder="Cidade do beneficiário"
                required
                maxLength="15"
                data-testid="cidade-input"
              />
              <p className="text-white/50 text-xs mt-2">
                Máximo 15 caracteres
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg
                disabled:bg-white/20 disabled:text-white/50 disabled:cursor-not-allowed
                enabled:bg-[#00ff00] enabled:text-[#0a1628] enabled:hover:bg-[#33ff33]"
              data-testid="save-config-btn"
            >
              {isLoading ? 'Salvando...' : 'Salvar Configuração'}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <span>ℹ️</span> Informações Importantes
            </h4>
            <ul className="text-white/70 text-sm space-y-1 list-disc list-inside">
              <li>A chave PIX deve estar cadastrada no seu banco</li>
              <li>Todas as transações serão enviadas para esta chave</li>
              <li>As alterações são aplicadas imediatamente</li>
              <li>Mantenha estes dados sempre atualizados</li>
            </ul>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-red-500/10 border-2 border-red-500/30 rounded-xl p-4">
          <p className="text-red-200 text-sm text-center font-semibold">
            🔒 Não compartilhe o acesso a este painel com terceiros. Mantenha suas credenciais seguras.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPainel;
