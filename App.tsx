
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { SparklesIcon } from './components/icons';
import { fileToBase64 } from './utils/fileUtils';
import { generateHairstyleImage } from './services/geminiService';

type AppState = 'initial' | 'loading' | 'result' | 'error';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>('initial');

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setAppState('initial');
    setGeneratedImage(null);
    setError(null);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setPrompt('');
    setGeneratedImage(null);
    setError(null);
    setAppState('initial');
  };

  const handleSubmit = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please upload an image and describe the hairstyle.');
      setAppState('error');
      return;
    }

    setAppState('loading');
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Image = await fileToBase64(originalImage);
      const newImageBase64 = await generateHairstyleImage(base64Image, originalImage.type, prompt);
      setGeneratedImage(`data:image/jpeg;base64,${newImageBase64}`);
      setAppState('result');
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate hairstyle. ${errorMessage}`);
      setAppState('error');
    }
  }, [originalImage, prompt]);

  const isButtonDisabled = appState === 'loading' || !originalImage || !prompt.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-200 text-gray-800 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-500">
          
          {(appState === 'initial' || appState === 'error') && (
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-semibold mb-2 text-gray-700">1. Upload Your Photo</label>
                <ImageUploader onImageUpload={handleImageUpload} image={originalImage} />
              </div>
              <div>
                <label htmlFor="prompt" className="block text-lg font-semibold mb-2 text-gray-700">2. Describe Your Dream Hairstyle</label>
                {/* FIX: Removed redundant `disabled` prop. The form is hidden during the 'loading' state, so this check was unnecessary and caused a TypeScript error. */}
                <input
                  id="prompt"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'short pixie cut with blonde highlights'"
                  className="w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow duration-300"
                />
              </div>
              <div className="text-center pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isButtonDisabled}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold text-white rounded-full transition-all duration-300 transform hover:scale-105 ${
                    isButtonDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-lg'
                  }`}
                >
                  <SparklesIcon />
                  Generate New Look
                </button>
              </div>
            </div>
          )}

          {appState === 'loading' && <Loader />}
          
          {appState === 'error' && error && (
             <div className="text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="font-bold">Oops! Something went wrong.</p>
                <p>{error}</p>
                <button onClick={handleReset} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Try Again</button>
             </div>
          )}

          {appState === 'result' && originalImage && generatedImage && (
            <div>
              <ResultDisplay
                originalImage={URL.createObjectURL(originalImage)}
                generatedImage={generatedImage}
              />
              <div className="text-center mt-8">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-700 transition-transform transform hover:scale-105"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
       <footer className="text-center py-4 text-sm text-gray-500">
        <p>Powered by Gemini AI. Images are generated and not real.</p>
      </footer>
    </div>
  );
};

export default App;
