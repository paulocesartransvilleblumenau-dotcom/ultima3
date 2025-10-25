import React from 'react';

const HomePage = () => {
  return (
    <div className="flex-1 p-8" data-testid="home-page">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-6">
          Bem-vindo ao ApostaBet Nacional
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-[#1E5A9E] to-[#2568b0] rounded-lg p-8 text-center">
          <h2 className="text-white text-3xl font-bold mb-4">
            Bônus de Boas-Vindas
          </h2>
          <p className="text-white text-lg mb-6">
            Ganhe até R$ 500 no seu primeiro depósito!
          </p>
          <button className="bg-[#FFD700] hover:bg-[#FFC700] text-[#0D1B3A] font-bold py-3 px-8 rounded-lg transition-colors">
            Cadastre-se Agora
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;