// pages/homepage.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../public/assets/logo.png';

const HomePage = () => {
  return (
    <div className="relative overflow-hidden h-screen flex flex-col items-center justify-center">
      {/* Background Video */}
      <video
        src="/assets/background.mp4" // Accessing the video via the public folder
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-[-1]" // Video in the background
        playsInline
      />

      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Logo */}
      <nav className="relative z-10 top-16 w-full flex justify-center">
        <Image src={Logo} alt="Logo" className="h-28 object-contain" />
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-full p-4">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-white drop-shadow-lg animate-fadeIn">
          Welcome to My AI Website Builder
        </h1>
        <p className="text-lg mb-8 text-center text-white drop-shadow-lg animate-fadeIn">
          Create stunning websites with ease using our AI-powered tool.
        </p>
        <Link href="/generate">
          <div className="bg-gray-300 text-black px-5 py-2 rounded font-bold animate-fadeIn animate-bounce">
            Generate Website
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
