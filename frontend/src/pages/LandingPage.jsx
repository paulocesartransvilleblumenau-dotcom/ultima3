import React from 'react';

const LandingPage = () => {
  return (
    <div className="flex-1 p-8" data-testid="landing-page">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-white text-5xl font-bold mb-4">
            Apostas Esportivas Online
          </h1>
          <p className="text-gray-300 text-xl">
            As melhores odds e os melhores jogos estão aqui!
          </p>
        </div>

        {/* Featured Games */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#1a3a52] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all cursor-pointer">
            <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">⚽</span>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold text-lg mb-2">Futebol</h3>
              <p className="text-gray-400 text-sm">Campeonatos nacionais e internacionais</p>
            </div>
          </div>

          <div className="bg-[#1a3a52] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all cursor-pointer">
            <div className="h-48 bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">🎰</span>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold text-lg mb-2">Cassino</h3>
              <p className="text-gray-400 text-sm">Slots, roleta, blackjack e muito mais</p>
            </div>
          </div>

          <div className="bg-[#1a3a52] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all cursor-pointer">
            <div className="h-48 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
              <span className="text-white text-4xl font-bold">🎮</span>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold text-lg mb-2">E-Sports</h3>
              <p className="text-gray-400 text-sm">Aposte nos maiores torneios de e-sports</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-[#1a3a52] rounded-lg p-8">
          <div className="text-center">
            <div className="text-[#FFD700] text-4xl font-bold mb-2">10M+</div>
            <div className="text-gray-300">Usuários Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-[#FFD700] text-4xl font-bold mb-2">500+</div>
            <div className="text-gray-300">Jogos Disponíveis</div>
          </div>
          <div className="text-center">
            <div className="text-[#FFD700] text-4xl font-bold mb-2">24/7</div>
            <div className="text-gray-300">Suporte Online</div>
          </div>
          <div className="text-center">
            <div className="text-[#FFD700] text-4xl font-bold mb-2">R$ 1B+</div>
            <div className="text-gray-300">Em Prêmios Pagos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;