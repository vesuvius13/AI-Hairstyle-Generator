
import React from 'react';

const loadingMessages = [
  "Styling in progress...",
  "Choosing the perfect shade...",
  "Getting the scissors ready...",
  "Adding the finishing touches...",
  "Almost ready for the big reveal!",
];

export const Loader: React.FC = () => {
  const [message, setMessage] = React.useState(loadingMessages[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = loadingMessages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10 space-y-4">
      <div className="w-16 h-16 border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <p className="text-lg text-gray-600 font-semibold transition-opacity duration-500">{message}</p>
    </div>
  );
};
