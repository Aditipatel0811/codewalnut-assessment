// src/app/pokemon/page.jsx

"use client";

import Link from 'next/link';

const PokemonLandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to the Pokémon World!</h1>
        <p className="text-gray-600 mb-6">
          Discover your favorite Pokémon, learn about their abilities, and explore the Pokémon universe. 
          Whether you’re searching for Pikachu or finding out the evolutions of Bulbasaur, we’ve got you covered!
        </p>
        <Link href="/pokemon/explore" className="px-6 py-3 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Start Exploring
        </Link>
      </div>
    </div>
  );
};

export default PokemonLandingPage;
