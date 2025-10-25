import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  IoFootball, 
  IoSearch,
  IoTrophy,
  IoDice,
  IoGameController,
  IoAirplane,
  IoBasketball,
  IoTennisball,
  IoAmericanFootball,
  IoBaseballOutline,
  IoClose
} from 'react-icons/io5';
import { 
  GiTigerHead,
  GiBasketballBall,
  GiSoccerBall,
  GiBoxingGlove,
  GiRaceCar,
  GiRugbyConversion
} from 'react-icons/gi';
import { MdSportsVolleyball, MdStar } from 'react-icons/md';
import { FaTableTennis, FaMotorcycle } from 'react-icons/fa';
import { TbBallVolleyball } from 'react-icons/tb';

const Sidebar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Brasileirão Série A', icon: IoTrophy, path: '/brasileirao', badge: '0' },
    { name: 'Futebol', icon: IoFootball, path: '/futebol' },
    { name: 'Cassino', icon: IoDice, path: '/cassino' },
    { name: 'Cassino Ao Vivo', icon: IoGameController, path: '/cassino-ao-vivo' },
    { name: 'Aviator', icon: IoAirplane, path: '/aviator' },
    { name: 'Tigrinho', icon: GiTigerHead, path: '/tigrinho' },
    { name: 'Basquete', icon: IoBasketball, path: '/basquete' },
    { name: 'E-Soccer', icon: GiSoccerBall, path: '/e-soccer' },
    { name: 'Tênis de Mesa', icon: FaTableTennis, path: '/tenis-mesa' },
    { name: 'Tênis', icon: IoTennisball, path: '/tenis' },
    { name: 'Vôlei', icon: MdSportsVolleyball, path: '/volei' },
    { name: 'Futsal', icon: IoFootball, path: '/futsal' },
    { name: 'MMA', icon: IoAmericanFootball, path: '/mma' },
    { name: 'Beisebol', icon: IoBaseballOutline, path: '/beisebol' },
    { name: 'Futebol Americano', icon: IoAmericanFootball, path: '/futebol-americano' },
    { name: 'Badminton', icon: IoTennisball, path: '/badminton' },
    { name: 'Boxe', icon: GiBoxingGlove, path: '/boxe' },
    { name: 'Fórmula 1', icon: GiRaceCar, path: '/formula-1' },
    { name: 'Vôlei de Praia', icon: TbBallVolleyball, path: '/volei-praia' },
    { name: 'Rugby', icon: GiRugbyConversion, path: '/rugby' },
    { name: 'Motociclismo', icon: FaMotorcycle, path: '/motociclismo' },
    { name: 'Especiais', icon: MdStar, path: '/especiais' },
    { name: 'Handebol', icon: IoBasketball, path: '/handebol' },
  ];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`
          w-64 bg-[#0A1628] h-[calc(100vh-64px)] overflow-y-auto sticky top-16 border-r border-[#1a3a52] z-50
          fixed lg:sticky
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        data-testid="sidebar"
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 text-white hover:text-[#FFD700] transition-colors"
        >
          <IoClose size={24} />
        </button>

        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a3a52] text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] text-sm"
              data-testid="sidebar-search"
            />
          </div>
        </div>

        {/* Categories */}
        <nav className="px-2 pb-4">
          {filteredCategories.map((category, index) => (
            <Link
              key={index}
              to="/escolher-valor"
              onClick={onClose}
              className="flex items-center space-x-3 px-4 py-3 hover:bg-[#1a3a52] rounded-lg transition-colors group"
              data-testid={`sidebar-item-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <category.icon className="text-white text-xl group-hover:text-[#FFD700] transition-colors" />
              <span className="text-white text-sm group-hover:text-[#FFD700] transition-colors flex-1">
                {category.name}
              </span>
              {category.badge && (
                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {category.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;