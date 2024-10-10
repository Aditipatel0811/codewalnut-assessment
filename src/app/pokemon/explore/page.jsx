// src/app/pokemon/explore/page.jsx

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const PokemonExplorePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterType, setFilterType] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchTerm) {
      searchPokemon();
    } else {
      fetchPokemon();
    }
  }, [page, sortBy, filterType, searchTerm]);

  const fetchPokemon = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`
      );
      const data = await response.json();

      // Fetch details for each Pokémon to get the image, types, abilities, and stats
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.front_default,
            types: details.types.map((type) => type.type.name),
            baseExperience: details.base_experience,
            abilities: details.abilities.map((ability) => ability.ability.name),
            stats: details.stats.map((stat) => ({
              name: stat.stat.name,
              value: stat.base_stat,
            })),
          };
        })
      );

      // Apply sorting
      const sortedPokemon = pokemonDetails.sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'baseExperience') {
          return b.baseExperience - a.baseExperience;
        }
        return 0;
      });

      // Apply filtering
      const filteredPokemon = filterType
        ? sortedPokemon.filter((pokemon) =>
            pokemon.types.includes(filterType.toLowerCase())
          )
        : sortedPokemon;

      setPokemonList(filteredPokemon);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setError("Failed to load Pokémon list. Please try again.");
    }
    setLoading(false);
  };

  const searchPokemon = async () => {
    if (!searchTerm) {
      setPokemonList([]);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`
      );

      if (!response.ok) {
        setPokemonList([]);
        setError("Pokémon not found. Please check the name or ID.");
        return;
      }

      const data = await response.json();
      const searchedPokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map((type) => type.type.name),
        baseExperience: data.base_experience,
        abilities: data.abilities.map((ability) => ability.ability.name),
        stats: data.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
      };

      setPokemonList([searchedPokemon]);
    } catch (error) {
      console.error("Error searching Pokémon:", error);
      setError("An error occurred while searching. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Explore Pokémon</h1>

      {/* Search, Sort, and Filter Controls */}
      <div className="mb-8 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search Pokémon by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-md w-64 text-gray-900"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded-md w-64 text-gray-900"
        >
          <option value="name">Sort by Name</option>
          <option value="baseExperience">Sort by Base Experience</option>
        </select>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 rounded-md w-64 text-gray-900"
        >
          <option value="">Filter by Type</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="fairy">Fairy</option>
          <option value="flying">Flying</option>
          {/* Add more types as needed */}
        </select>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center mb-8">
          <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-8 h-8 animate-spin"></div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-center text-red-500 mb-8">{error}</p>}

      {/* Pokémon List */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon) => (
          <Link href={`/pokemon/explore/${pokemon.id}`} key={pokemon.id}>
            <div className="bg-gray-800 p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-full h-32 object-contain mb-4"
              />
              <h2 className="text-xl font-semibold capitalize text-white">{pokemon.name}</h2>
              <p className="text-gray-400">Types: {pokemon.types.join(', ')}</p>
              <p className="text-gray-400">Base Experience: {pokemon.baseExperience}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonExplorePage;
