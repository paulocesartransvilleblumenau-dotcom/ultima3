import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import LoginModal from "@/components/LoginModal";
import HomePage from "@/pages/HomePage";
import LandingPage from "@/pages/LandingPage";
import LandingAfterLogin from "@/pages/LandingAfterLogin";
import EscolherValor from "@/pages/EscolherValor";
import PagamentoPix from "@/pages/PagamentoPix";
import AdminLogin from "@/pages/AdminLogin";
import AdminPainel from "@/pages/AdminPainel";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  const handleLoginSuccess = () => {
    // Reload user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Admin Routes (sem sidebar) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/painel" element={<AdminPainel />} />
          
          {/* Main App Routes (com layout) */}
          <Route path="*" element={
            <div className="min-h-screen bg-[#0D1B3A]">
              <Header onLoginClick={() => setIsLoginModalOpen(true)} userProp={user} />
              
              <div className="flex">
                <Sidebar />
                
                <main className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<HomePage onLoginClick={() => setIsLoginModalOpen(true)} />} />
                    <Route path="/landing" element={<LandingAfterLogin />} />
                    <Route path="/escolher-valor" element={<EscolherValor />} />
                    <Route path="/pagamento-pix" element={<PagamentoPix />} />
                    <Route path="/esportes" element={<HomePage onLoginClick={() => setIsLoginModalOpen(true)} />} />
                    <Route path="/ao-vivo" element={<HomePage onLoginClick={() => setIsLoginModalOpen(true)} />} />
                    <Route path="/melhores-listas" element={<HomePage onLoginClick={() => setIsLoginModalOpen(true)} />} />
                    <Route path="/futebol" element={<HomePage onLoginClick={() => setIsLoginModalOpen(true)} />} />
                    <Route path="/campeonatos" element={<HomePage onLoginClick={() => setIsLoginModalOpen(true)} />} />
                    <Route path="/cassino-ao-vivo" element={<HomePage onLoginClick={() => setIsLoginModalOpen(true)} />} />
                    <Route path="/cassino" element={<HomePage onLoginClick={() => setIsLoginModalOpen(true)} />} />
                    <Route path="/aviator" element={<HomePage onLoginClick={() => setIsLoginModalOpen(true)} />} />
                    <Route path="/mines" element={<HomePage onLoginClick={() => setIsLoginModalOpen(true)} />} />
                    <Route path="/cadastro" element={<LandingPage />} />
                  </Routes>
                </main>
              </div>

              <LoginModal 
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onSuccess={handleLoginSuccess}
              />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
