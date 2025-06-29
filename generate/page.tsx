'use client'; // Ensures this component runs as a client-side component

import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // For programmatic navigation
import { useAtom } from 'jotai'; // For state management
import { AiResEcommerece, aiResponseAtom, AiResPortfolio, AiResRestaurant } from '../atoms/aiReponseAtom'; // Ensure the correct import path

export function removeSpecialCharacters(str : string) {
  return str?.replace(/[^a-zA-Z0-9 ]/g, '');
}
export const addOpacityToHex = (hex: string, opacity: number = 1) :string => {
  // Remove the '#' if it's there
  const clampedOpacity = Math.min(1, Math.max(0, opacity));

  // Remove the '#' if it's there
  const cleanHex = hex!.replace('#', '');

  // Calculate the opacity in hex (from 0-255)
  const alphaHex = Math.round(clampedOpacity * 255).toString(16).padStart(2, '0');

  // Combine the hex color with the alpha value
  return `#${cleanHex}${alphaHex}`;
};

export const imagepath = (title: string) : string => {
  return `https://image.pollinations.ai/prompt/${removeSpecialCharacters(title)}?width=2160&height=1080&nologo=true&model=flux`
} 

const GeneratePage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');

  const [, setAiResponse] = useAtom(aiResponseAtom);
  const router = useRouter();

  const routeMap: Record<string, string> = {
    'E-Commerce Site': '/create/ecommerce',
    'Portfolio Website': '/create/portfolio',
    'Restaurant Website': '/create/restaurant',
  };

  const handleGenerate = async (): Promise<void> => {
    if (!selectedType) {
      setError('Please select a website type before generating.');
      return;
    }

    const route = routeMap[selectedType];
    if (!route) {
      setError('Invalid website type');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000${route}`, {
        prompt: userInput,
      });
      console.log('res : ', response.data.data)

      if (response.status !== 200) {
        throw new Error(`Unexpected response status: ${response.status}`);
      }

      console.log('route : ', route)

      switch(route) {
        case '/create/ecommerce' :
          setAiResponse(response.data.data as AiResEcommerece);
          router.push('/templates/ecommerce');
          break
        case '/create/portfolio' :
          setAiResponse(response.data.data as AiResPortfolio);
          router.push('/templates/portfolio');
          break
        case '/create/restaurant' :
          setAiResponse(response.data.data as AiResRestaurant);
          router.push('/templates/restaurant');
          break
        default :
          throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (err) {
      setError(`Failed to generate website. Error: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (type: string): void => {
    setSelectedType(type);
    setUserInput(''); // Clear input for new template
  };


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
        <source src="/assets/background2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10">
        <h1 className="text-5xl font-bold text-white mb-8 text-center">Select Website Type</h1>

        <div className="relative w-full max-w-md mb-8">
          <button
            className="w-full bg-black text-white py-4 px-6 rounded-lg shadow-lg flex justify-between items-center transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            {selectedType || 'Choose Website Type'}
            <span className="transform transition-transform duration-300">▼</span>
          </button>
          {(
            <div className="bg-gray-800 text-white py-4 px-6 mt-2 rounded-lg shadow-lg">
              {Object.keys(routeMap).map((type) => (
                <button
                  key={type}
                  onClick={() => handleSelect(type)}
                  className="block w-full text-left py-2 px-4 rounded-lg mb-2 bg-gray-700 hover:bg-gray-600 transition-transform duration-200 ease-in-out transform hover:scale-105"
                >
                  {type}
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedType && (
          <div className="relative w-full max-w-md mb-8">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={`Describe how you want to customize the ${selectedType}`}
              className="w-full p-4 rounded-lg shadow-lg text-black"
              rows={5}
            />
          </div>
        )}

        <div className="flex justify-center">
          <button
              onClick={handleGenerate}
              className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
              disabled={loading} >
            {loading ? 'Generating...' : 'Generate Website'}
          </button>
        </div>


        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default GeneratePage;
