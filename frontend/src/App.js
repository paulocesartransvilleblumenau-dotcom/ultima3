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
        <div className="min-h-screen bg-[#0D1B3A]">
          <Header onLoginClick={() => setIsLoginModalOpen(true)} userProp={user} />
          
          <div className="flex">
            <Sidebar />
            
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/landing" element={<LandingAfterLogin />} />
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
                <Route path="/escolher-valor" element={<LandingPage />} />
              </Routes>
            </main>
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
