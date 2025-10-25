import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Abrir modal de login (você pode conectar com o LoginModal do App.js)
    navigate('/landing');
  };

  const handleCadastro = () => {
    navigate('/cadastro');
  };

  return (
    <div className="flex-1 p-8" data-testid="home-page">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <h1 className="text-white text-4xl font-bold mb-6 text-center">
          Bem-vindo ao ApostaBet Nacional
        </h1>
        
        {/* Cards de Categorias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-[#1a3a52] rounded-lg p-6 hover:bg-[#2a4a62] transition-colors cursor-pointer">
            <h3 className="text-white text-xl font-semibold mb-3">Esportes</h3>
            <p className="text-gray-300 text-sm">Aposte nos seus esportes favoritos com as melhores odds do mercado.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1a3a52] rounded-lg p-6 hover:bg-[#2a4a62] transition-colors cursor-pointer">
            <h3 className="text-white text-xl font-semibold mb-3">Cassino</h3>
            <p className="text-gray-300 text-sm">Divirta-se com centenas de jogos de cassino online.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1a3a52] rounded-lg p-6 hover:bg-[#2a4a62] transition-colors cursor-pointer">
            <h3 className="text-white text-xl font-semibold mb-3">Ao Vivo</h3>
            <p className="text-gray-300 text-sm">Acompanhe e aposte em eventos ao vivo em tempo real.</p>
          </div>
        </div>

        {/* Botões Centralizados */}
        <div className="flex justify-center items-center gap-6 py-12">
          <Button
            onClick={handleCadastro}
            className="bg-white text-[#0D1B3A] hover:bg-gray-100 text-xl font-bold px-12 py-6 rounded-xl"
            data-testid="criar-conta-home-btn"
          >
            Criar Conta
          </Button>
          <Button
            onClick={handleLogin}
            className="bg-[#1E5A9E] hover:bg-[#2568b0] text-white text-xl font-bold px-12 py-6 rounded-xl"
            data-testid="entrar-home-btn"
          >
            Entrar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;