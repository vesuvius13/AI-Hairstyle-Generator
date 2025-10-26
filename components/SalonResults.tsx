import React from 'react';
import { LocationIcon } from './icons';

interface SalonResultsProps {
  results: {
    text: string;
    links: {
      maps?: {
        uri: string;
        title: string;
      };
      web?: {
        uri: string;
        title: string;
      }
    }[];
  };
}

const formatSalonText = (text: string) => {
  // Split by newline and filter out empty lines
  const lines = text.split('\n').filter(line => line.trim() !== '');
  
  // Find the introductory line if it exists
  const introLine = lines.find(line => !line.trim().startsWith('*'));
  const listItems = lines.filter(line => line.trim().startsWith('*'));

  const parsedItems = listItems.map((item, index) => {
    // Remove the leading '*' and trim
    const content = item.replace(/^\*/, '').trim();
    // Replace **text** with <strong>text</strong> for bolding
    const formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
    return <li key={index} className="mb-2" dangerouslySetInnerHTML={{ __html: formattedContent }} />;
  });
  
  return { introLine, parsedItems };
};


export const SalonResults: React.FC<SalonResultsProps> = ({ results }) => {
  const validLinks = results.links.filter(link => link.maps || link.web);
  const { introLine, parsedItems } = formatSalonText(results.text);

  return (
    <div className="mt-8 p-6 bg-purple-50/50 backdrop-blur-sm rounded-xl shadow-md space-y-6 animate-fade-in border border-purple-200">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Nearby Salons</h3>
        {introLine && <p className="text-gray-600 mb-4">{introLine}</p>}
        {parsedItems.length > 0 && (
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {parsedItems}
          </ul>
        )}
      </div>

      {validLinks.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Explore on Google Maps</h4>
          <div className="flex flex-wrap gap-3">
            {validLinks.map((link, index) => {
              const place = link.maps || link.web;
              if (!place) return null;

              return (
                <a
                  key={index}
                  href={place.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md hover:bg-purple-100 transition-all duration-300 border border-gray-200 group"
                >
                  <LocationIcon className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors" />
                  <span className="font-semibold text-sm text-purple-800 group-hover:text-purple-900 transition-colors">{place.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
