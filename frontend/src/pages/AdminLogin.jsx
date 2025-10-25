import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLockClosed, IoPerson } from 'react-icons/io5';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/admin/login`, formData);
      
      if (response.data.status === 'success') {
        // Salvar token no localStorage
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', formData.username);
        
        // Redirecionar para painel admin
        navigate('/admin/painel');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Usuário ou senha incorretos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] to-[#1a3a52] flex items-center justify-center p-5">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <div className="bg-[#ffd700] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
            <IoLockClosed className="text-4xl text-[#0a1628]" />
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-white/70">Acesso restrito a administradores</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">
                Usuário
              </label>
              <div className="relative">
                <IoPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white
                    focus:outline-none focus:border-[#ffd700] focus:bg-white/15 transition-all"
                  placeholder="Digite seu usuário"
                  required
                  data-testid="admin-username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-white text-sm font-semibold mb-2 block">
                Senha
              </label>
              <div className="relative">
                <IoLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-xl" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white
                    focus:outline-none focus:border-[#ffd700] focus:bg-white/15 transition-all"
                  placeholder="Digite sua senha"
                  required
                  data-testid="admin-password"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border-2 border-red-500/50 rounded-xl p-3 text-red-200 text-sm text-center">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all
                disabled:bg-white/20 disabled:text-white/50 disabled:cursor-not-allowed
                enabled:bg-[#ffd700] enabled:text-[#0a1628] enabled:hover:bg-[#ffed4e] enabled:shadow-lg"
              data-testid="admin-login-btn"
            >
              {isLoading ? 'Entrando...' : 'Entrar no Painel'}
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t-2 border-white/10">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
              <p className="text-white/70 text-xs text-center">
                🔒 Área restrita. Apenas administradores autorizados.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-white/70 hover:text-white transition-colors text-sm"
          >
            ← Voltar ao site
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
