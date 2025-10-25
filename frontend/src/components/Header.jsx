import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { IoPersonCircle, IoMenu } from 'react-icons/io5';

const Header = ({ onLoginClick, userProp, onMenuClick }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to check user from localStorage
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (e) {
          console.error('Error parsing user data:', e);
        }
      } else {
        setUser(null);
      }
    };

    // Check initially
    checkUser();

    // Listen for storage events (when localStorage changes)
    window.addEventListener('storage', checkUser);
    
    // Also check periodically (for same-window updates)
    const interval = setInterval(checkUser, 1000);

    return () => {
      window.removeEventListener('storage', checkUser);
      clearInterval(interval);
    };
  }, []);

  // Update user when userProp changes
  useEffect(() => {
    if (userProp) {
      setUser(userProp);
    }
  }, [userProp]);

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/');
    }
  };

  return (
    <header data-testid="header" className="bg-[#0D1B3A] border-b border-[#1a3a52] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Menu Hamburguer (Mobile) */}
          <button
            onClick={onMenuClick}
            className="lg:hidden text-white hover:text-[#FFD700] transition-colors"
            data-testid="menu-btn"
          >
            <IoMenu size={28} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="logo-link">
            <div className="text-xl md:text-2xl font-bold lowercase">
              <span className="text-[#FFD700]">aposta</span>
              <span className="text-white">bet</span>
              <span className="text-white">nacional</span>
            </div>
          </Link>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden xl:flex items-center space-x-6">
            <Link to="/esportes" className="text-white hover:text-[#FFD700] transition-colors text-sm" data-testid="nav-esportes">
              Esportes
            </Link>
            <Link to="/ao-vivo" className="text-white hover:text-[#FFD700] transition-colors text-sm" data-testid="nav-ao-vivo">
              Ao Vivo
            </Link>
            <Link to="/melhores-listas" className="text-white hover:text-[#FFD700] transition-colors text-sm" data-testid="nav-melhores-listas">
              Melhores Listas
            </Link>
            <Link to="/futebol" className="text-white hover:text-[#FFD700] transition-colors text-sm" data-testid="nav-futebol">
              Só Futebol
            </Link>
            <Link to="/campeonatos" className="text-white hover:text-[#FFD700] transition-colors text-sm" data-testid="nav-campeonatos">
              Campeonatos
            </Link>
            <Link to="/cassino-ao-vivo" className="text-white hover:text-[#FFD700] transition-colors text-sm relative" data-testid="nav-cassino-ao-vivo">
              Cassino Ao Vivo
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded">Novo</span>
            </Link>
            <Link to="/cassino" className="text-white hover:text-[#FFD700] transition-colors text-sm relative" data-testid="nav-cassino">
              Cassino
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 rounded">Novo</span>
            </Link>
            <Link to="/aviator" className="text-white hover:text-[#FFD700] transition-colors text-sm" data-testid="nav-aviator">
              Aviator
            </Link>
            <Link to="/mines" className="text-white hover:text-[#FFD700] transition-colors text-sm" data-testid="nav-mines">
              Mines
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-white">
                  <IoPersonCircle className="text-2xl text-yellow-400" />
                  <span className="text-sm font-semibold" data-testid="user-name">{user.username}</span>
                </div>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  className="bg-red-600 text-white hover:bg-red-700 border-none"
                  data-testid="sair-btn"
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button 
                  onClick={() => navigate('/cadastro')}
                  variant="outline" 
                  className="bg-white text-[#0D1B3A] hover:bg-gray-100 border-none"
                  data-testid="criar-conta-btn"
                >
                  Criar Conta
                </Button>
                <Button 
                  onClick={onLoginClick}
                  className="bg-[#1E5A9E] hover:bg-[#2568b0] text-white"
                  data-testid="entrar-btn"
                >
                  Entrar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;