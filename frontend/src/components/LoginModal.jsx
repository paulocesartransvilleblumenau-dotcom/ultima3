import React, { useState } from 'react';
import { IoClose, IoEye, IoEyeOff } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LoginModal = ({ isOpen, onClose, onSuccess }) => {
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
      // Log access (sem senha)
      await axios.post(`${API}/log-access`, {
        username: formData.username
      });

      // Salvar usuário no localStorage (simulação)
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        loggedIn: true
      }));

      if (onSuccess) {
        onSuccess();
      }
      
      onClose();
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-testid="login-modal-overlay"
    >
      <div 
        className="bg-[#0D1B3A] rounded-2xl p-8 max-w-md w-full relative shadow-2xl border border-[#1a3a52]"
        onClick={(e) => e.stopPropagation()}
        data-testid="login-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          data-testid="close-login-modal-btn"
        >
          <IoClose size={24} />
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="text-3xl font-bold lowercase">
            <span className="text-[#FFD700]">aposta</span>
            <span className="text-white">bet</span>
            <span className="text-white">nacional</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-white text-2xl font-semibold text-center mb-8" data-testid="login-modal-title">
          Junte-se a nós
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-4" data-testid="login-error-message">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} data-testid="login-form">
          {/* Username Field */}
          <div className="mb-4">
            <Label htmlFor="username" className="text-white text-sm mb-2 block">
              CPF, E-mail ou Usuário
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Digite seu CPF, e-mail ou usuário"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-white text-gray-900 border-none"
              data-testid="username-input"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <Label htmlFor="password" className="text-white text-sm mb-2 block">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite a senha"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white text-gray-900 border-none pr-10"
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

          {/* Forgot Password */}
          <div className="text-left mb-6">
            <button
              type="button"
              onClick={handleRecoverPassword}
              className="text-[#4a9eff] hover:text-[#6bb0ff] text-sm transition-colors"
              data-testid="forgot-password-btn"
            >
              Esqueci a Senha
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1E5A9E] hover:bg-[#2568b0] text-white py-6 text-lg font-semibold"
            data-testid="login-submit-btn"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        {/* Create Account */}
        <div className="text-center mt-6">
          <span className="text-gray-400 text-sm">Ainda não tem conta? </span>
          <button
            onClick={() => {
              onClose();
              // Navigate to create account
            }}
            className="text-[#4a9eff] hover:text-[#6bb0ff] text-sm font-semibold transition-colors"
            data-testid="create-account-link"
          >
            Criar agora
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white bg-opacity-10 rounded-lg p-4 border border-[#1a3a52]">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 text-white mt-1">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-semibold mb-1">Precisa de ajuda para entrar?</p>
              <a href="#" className="text-[#4a9eff] hover:text-[#6bb0ff] text-sm transition-colors" data-testid="help-link">
                Entre em contato com o suporte
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;