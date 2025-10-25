import React from 'react';
import { IoClose } from 'react-icons/io5';

const RightSidebar = () => {
  return (
    <aside 
      className="w-80 bg-[#0D1B3A] h-[calc(100vh-64px)] sticky top-16 border-l border-[#1a3a52] p-4"
      data-testid="right-sidebar"
    >
      {/* Links de Info */}
      <div className="flex items-center justify-end space-x-4 mb-6 text-xs text-gray-400">
        <a href="#" className="hover:text-white transition-colors" data-testid="termos-link">
          Termos e Condições
        </a>
        <a href="#" className="hover:text-white transition-colors" data-testid="jogo-responsavel-link">
          Jogo Responsável
        </a>
      </div>

      {/* Caderneta */}
      <div className="bg-[#1a3a52] rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold" data-testid="caderneta-title">
            Caderneta
          </h3>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full" data-testid="caderneta-count">
              0
            </span>
          </div>
        </div>

        <div className="text-center py-8">
          <p className="text-gray-400 text-sm" data-testid="caderneta-empty-message">
            Ainda não há nenhuma aposta!
          </p>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;