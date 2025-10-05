
import React from 'react';
import { ScissorsIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center gap-4">
          <ScissorsIcon className="w-10 h-10 text-purple-600" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            AI Hairstyle Generator
          </h1>
        </div>
        <p className="mt-2 text-lg text-gray-600">Find your next look in seconds!</p>
      </div>
    </header>
  );
};
