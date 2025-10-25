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

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="min-h-screen bg-[#0D1B3A]">
          <Header onLoginClick={() => setIsLoginModalOpen(true)} />
          
          <div className="flex">
            <Sidebar />
            
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/esportes" element={<HomePage />} />
                <Route path="/ao-vivo" element={<HomePage />} />
                <Route path="/melhores-listas" element={<HomePage />} />
                <Route path="/futebol" element={<HomePage />} />
                <Route path="/campeonatos" element={<HomePage />} />
                <Route path="/cassino-ao-vivo" element={<HomePage />} />
                <Route path="/cassino" element={<HomePage />} />
                <Route path="/aviator" element={<HomePage />} />
                <Route path="/mines" element={<HomePage />} />
                <Route path="/cadastro" element={<LandingPage />} />
              </Routes>
            </main>

            <RightSidebar />
          </div>

          <LoginModal 
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            onSuccess={handleLoginSuccess}
          />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
