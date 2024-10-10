// src/app/pokemon/explore/[id]/page.jsx

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PokemonDetailsPage = ({ params }) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();
      setPokemon({
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map((type) => type.type.name),
        abilities: data.abilities.map((ability) => ability.ability.name),
        stats: data.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        height: data.height,
        weight: data.weight,
      });
    } catch (error) {
      console.error("Error fetching Pokémon details:", error);
      setError("Failed to load Pokémon details. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="absolute top-4 left-4">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Go Back
        </button>
      </div>

      {loading ? (
        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        pokemon && (
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h1 className="text-4xl font-bold text-white capitalize mb-4">{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} className="w-48 h-48 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Types: {pokemon.types.join(', ')}</p>
            <p className="text-gray-400 mb-4">Abilities: {pokemon.abilities.join(', ')}</p>
            <div className="text-gray-400 mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">Stats:</h3>
              <ul>
                {pokemon.stats.map((stat) => (
                  <li key={stat.name}>
                    {stat.name}: {stat.value}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-gray-400">Height: {pokemon.height / 10} m</p>
            <p className="text-gray-400">Weight: {pokemon.weight / 10} kg</p>
          </div>
        )
      )}
    </div>
  );
};

export default PokemonDetailsPage;
