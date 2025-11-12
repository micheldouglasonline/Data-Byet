import React from 'react';
import { MobileIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="pt-8 pb-6 text-center">
      <div className="container mx-auto flex flex-col items-center">
        <div className="w-24 h-24 mb-4 rounded-full bg-white/10 p-1 shadow-lg shadow-blue-500/20 flex items-center justify-center">
             <MobileIcon className="w-14 h-14 text-blue-300" />
        </div>
         <h1 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">Data Byte Cotia</h1>
         <p className="text-lg text-red-400">Assistente com IA</p>
      </div>
    </header>
  );
};

export default Header;