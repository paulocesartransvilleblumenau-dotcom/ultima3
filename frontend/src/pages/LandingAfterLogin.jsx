import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingAfterLogin = () => {
  const navigate = useNavigate();

  // Redirecionar para escolher-valor em qualquer clique na página
  const handlePageClick = () => {
    navigate('/escolher-valor');
  };

  return (
    <div className="flex-1 overflow-y-auto" data-testid="landing-after-login" onClick={handlePageClick} style={{ cursor: 'pointer' }}>
      {/* Hero Section */}
      <section 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(30, 58, 95, 0.85), rgba(15, 38, 68, 0.85)), url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&q=80')"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="text-center text-white space-y-8 max-w-4xl">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-3 rounded-full font-bold text-base shadow-lg animate-pulse">
              🎉 PROMOÇÃO ESPECIAL PARA A SUA CONTA
            </div>
            <h2 className="text-8xl font-extrabold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">
              500% DE BÔNUS
            </h2>
            <p className="text-3xl font-medium text-gray-100 leading-relaxed">
              Deposite <span className="text-yellow-400 font-bold">AGORA</span> acima de <span className="text-yellow-400 font-bold">R$ 100</span> e ganhe <span className="text-yellow-400 font-bold">500% de Bônus</span> imediatamente para usar como quiser.
            </p>
            <button 
              onClick={() => navigate('/escolher-valor')}
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-gray-900 px-16 py-6 rounded-xl font-bold text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              data-testid="depositar-btn"
            >
              DEPOSITAR AGORA
            </button>
            <div className="text-left text-sm text-gray-300 italic space-y-2 max-w-2xl mx-auto">
              <p>* Promoção válida com limite máximo de bônus de R$ 5.000,00</p>
              <p>* Promoção válida apenas hoje</p>
              <p>* Saque de bônus liberado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-[#1e3a5f] to-[#2a4a6f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center text-white mb-16">Por que escolher a Aposta Bet Nacional?</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-yellow-500/30 hover:border-yellow-500 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <svg className="h-16 w-16 text-yellow-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <h4 className="text-xl font-bold text-white mb-3">Pagamento Rápido</h4>
              <p className="text-gray-200">Saques processados em minutos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-yellow-500/30 hover:border-yellow-500 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <svg className="h-16 w-16 text-yellow-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              <h4 className="text-xl font-bold text-white mb-3">Melhores Odds</h4>
              <p className="text-gray-200">Odds competitivas do mercado</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-yellow-500/30 hover:border-yellow-500 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <svg className="h-16 w-16 text-yellow-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h4 className="text-xl font-bold text-white mb-3">Ao Vivo</h4>
              <p className="text-gray-200">Aposte durante os jogos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center border border-yellow-500/30 hover:border-yellow-500 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <svg className="h-16 w-16 text-yellow-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <h4 className="text-xl font-bold text-white mb-3">100% Seguro</h4>
              <p className="text-gray-200">Seus dados protegidos</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-gradient-to-br from-[#2a4a6f] to-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center text-white mb-16">Como Funciona</h3>
          <div className="grid md:grid-cols-4 gap-10">
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Cadastre-se</h4>
              <p className="text-gray-200 text-lg">Crie sua conta em segundos</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Deposite</h4>
              <p className="text-gray-200 text-lg">Adicione créditos e ganhe bônus</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Aposte</h4>
              <p className="text-gray-200 text-lg">Escolha seu jogo favorito</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-gray-900 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                4
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Ganhe</h4>
              <p className="text-gray-200 text-lg">Receba seus prêmios rapidamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#1e3a5f] to-[#2a4a6f]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-8">
            Pronto para começar a ganhar?
          </h2>
          <p className="text-2xl text-gray-200 mb-10">
            Faça seu primeiro depósito e aproveite o bônus de 500%!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => navigate('/escolher-valor')}
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-gray-900 px-12 py-5 rounded-xl font-bold text-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
              data-testid="comecar-agora-btn"
            >
              COMEÇAR AGORA
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingAfterLogin;