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
  IoBaseballOutline
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

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Brasileirão Série A', icon: IoTrophy, path: '/brasileirao', badge: '0', color: '#C9A961' },
    { name: 'Futebol', icon: IoFootball, path: '/futebol', color: '#7FBF7F' },
    { name: 'Cassino', icon: IoDice, path: '/cassino', color: '#C67FA6' },
    { name: 'Cassino Ao Vivo', icon: IoGameController, path: '/cassino-ao-vivo', color: '#9B8FB3' },
    { name: 'Aviator', icon: IoAirplane, path: '/aviator', color: '#CC8866' },
    { name: 'Tigrinho', icon: GiTigerHead, path: '/tigrinho', color: '#D4A574' },
    { name: 'Basquete', icon: IoBasketball, path: '/basquete', color: '#CC9966' },
    { name: 'E-Soccer', icon: GiSoccerBall, path: '/e-soccer', color: '#8FB38F' },
    { name: 'Tênis de Mesa', icon: FaTableTennis, path: '/tenis-mesa', color: '#7DB3B3' },
    { name: 'Tênis', icon: IoTennisball, path: '/tenis', color: '#C9C97F' },
    { name: 'Vôlei', icon: MdSportsVolleyball, path: '/volei', color: '#C9A961' },
    { name: 'Futsal', icon: IoFootball, path: '/futsal', color: '#A6BF8F' },
    { name: 'MMA', icon: IoAmericanFootball, path: '/mma', color: '#B3747A' },
    { name: 'Beisebol', icon: IoBaseballOutline, path: '/beisebol', color: '#7B96C9' },
    { name: 'Futebol Americano', icon: IoAmericanFootball, path: '/futebol-americano', color: '#9B8066' },
    { name: 'Badminton', icon: IoTennisball, path: '/badminton', color: '#7FB399' },
    { name: 'Boxe', icon: GiBoxingGlove, path: '/boxe', color: '#CC7F7F' },
    { name: 'Fórmula 1', icon: GiRaceCar, path: '/formula-1', color: '#CC9180' },
    { name: 'Vôlei de Praia', icon: TbBallVolleyball, path: '/volei-praia', color: '#CCA6B3' },
    { name: 'Rugby', icon: GiRugbyConversion, path: '/rugby', color: '#7AA67A' },
    { name: 'Motociclismo', icon: FaMotorcycle, path: '/motociclismo', color: '#CC8FA6' },
    { name: 'Especiais', icon: MdStar, path: '/especiais', color: '#C9A961' },
    { name: 'Handebol', icon: IoBasketball, path: '/handebol', color: '#6A9ED9' },
  ];

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside 
      className="w-64 bg-[#0A1628] h-[calc(100vh-64px)] overflow-y-auto sticky top-16 border-r border-[#1a3a52]"
      data-testid="sidebar"
    >
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
            className="flex items-center space-x-3 px-4 py-3 hover:bg-[#1a3a52] rounded-lg transition-colors group"
            data-testid={`sidebar-item-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <category.icon 
              className="text-xl group-hover:text-[#FFD700] transition-colors" 
              style={{ color: category.color }}
            />
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
  );
};

export default Sidebar;