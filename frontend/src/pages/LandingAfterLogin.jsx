import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingAfterLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto" data-testid="landing-after-login">
      {/* Hero Section */}
      <section 
        className="relative h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 139, 0.8), rgba(0, 0, 139, 0.8)), url('https://images.unsplash.com/photo-1663298954428-c15bbe3c8100?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxzdGFkaXVtJTIwZm9vdGJhbGwlMjBicmF6aWx8ZW58MHx8fHwxNzYxMTU3NjY2fDA&ixlib=rb-4.1.0&q=85')"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-8 items-center w-full">
            <div className="text-white space-y-6">
              <div className="inline-block bg-yellow-500 text-blue-900 px-6 py-2 rounded-full font-bold text-sm animate-pulse">
                🎉 PROMOÇÃO ESPECIAL
              </div>
              <h2 className="text-6xl font-extrabold text-yellow-400">
                500% DE BÔNUS
              </h2>
              <p className="text-2xl font-semibold">
                Deposite acima de R$ 100 e ganhe 500% de Bônus imediatamente para usar como quiser.
              </p>
              <button 
                onClick={() => navigate('/escolher-valor')}
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-12 py-4 rounded-xl font-bold text-xl transition transform hover:scale-105 shadow-2xl"
                data-testid="depositar-btn"
              >
                DEPOSITAR AGORA
              </button>
              <p className="text-sm text-gray-300">
                * Promoção com limite de Bônus de 5 Mil reais.
              </p>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1676270891810-7da36dd02c85?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="App Aposta Bet Nacional"
                className="w-full max-w-md mx-auto drop-shadow-2xl rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[#0D1B3A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-white mb-12">Por que escolher a Aposta Bet Nacional?</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-blue-900/50 p-6 rounded-xl text-center border border-yellow-500/20 hover:border-yellow-500 transition">
              <svg className="h-12 w-12 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <h4 className="text-xl font-bold text-white mb-2">Pagamento Rápido</h4>
              <p className="text-gray-300">Saques processados em minutos</p>
            </div>
            <div className="bg-blue-900/50 p-6 rounded-xl text-center border border-yellow-500/20 hover:border-yellow-500 transition">
              <svg className="h-12 w-12 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              <h4 className="text-xl font-bold text-white mb-2">Melhores Odds</h4>
              <p className="text-gray-300">Odds competitivas do mercado</p>
            </div>
            <div className="bg-blue-900/50 p-6 rounded-xl text-center border border-yellow-500/20 hover:border-yellow-500 transition">
              <svg className="h-12 w-12 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h4 className="text-xl font-bold text-white mb-2">Ao Vivo</h4>
              <p className="text-gray-300">Aposte durante os jogos</p>
            </div>
            <div className="bg-blue-900/50 p-6 rounded-xl text-center border border-yellow-500/20 hover:border-yellow-500 transition">
              <svg className="h-12 w-12 text-yellow-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <h4 className="text-xl font-bold text-white mb-2">100% Seguro</h4>
              <p className="text-gray-300">Seus dados protegidos</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-white mb-12">Como Funciona</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-500 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Cadastre-se</h4>
              <p className="text-gray-300">Crie sua conta em segundos</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Deposite</h4>
              <p className="text-gray-300">Adicione créditos e ganhe bônus</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Aposte</h4>
              <p className="text-gray-300">Escolha seu jogo favorito</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-500 text-blue-900 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Ganhe</h4>
              <p className="text-gray-300">Receba seus prêmios rapidamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0D1B3A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para começar a ganhar?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Faça seu primeiro depósito e aproveite o bônus de 500%!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => navigate('/escolher-valor')}
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 px-10 py-4 rounded-xl font-bold text-xl transition transform hover:scale-105 shadow-2xl"
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