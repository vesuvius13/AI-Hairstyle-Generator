import React from 'react';
import { DownloadIcon } from './icons';

interface ResultDisplayProps {
  originalImage: string;
  generatedImage: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Your New Look is Ready!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Original</h3>
          <img src={originalImage} alt="Original" className="w-full h-auto object-contain rounded-xl shadow-lg" />
        </div>
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-lg font-semibold text-pink-600">New Hairstyle</h3>
          <img src={generatedImage} alt="Generated Hairstyle" className="w-full h-auto object-contain rounded-xl shadow-lg" />
           <a
            href={generatedImage}
            download="new-hairstyle.jpeg"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-purple-600 rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-purple-700 hover:shadow-lg"
            aria-label="Download generated image"
          >
            <DownloadIcon className="w-5 h-5" />
            Download Image
          </a>
        </div>
      </div>
    </div>
  );
};
