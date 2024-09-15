import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BreweryList() {
  const [breweries, setBreweries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const perPage = 10;

  const baseURL = "https://api.openbrewerydb.org/breweries";

  const fetchBreweries = async () => {
    const data = await fetch(
      `${baseURL}?page=${currentIndex}&per_page=${perPage}`
    ).then((response) => response.json());
    setBreweries(data);
  };

  useEffect(() => {
    fetchBreweries();
  }, [currentIndex]);

  const incrementPage = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const decrementPage = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 1));
  };

  const renderBreweries = () => {
    return breweries.map((brewery) => {
      const { id, name, city, state } = brewery;

      return (
        <li key={id}>
          <Link
            to={`/breweries/${id}`}
            className="block bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-amber-800 mb-2">{name}</h2>
            <p className="text-gray-700">
              {city}, {state}
            </p>
          </Link>
        </li>
      );
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url('/brewery.webp')`,
      }}
    >
      <div className="bg-gradient-to-b from-white bg-opacity-50 absolute inset-0"></div> {/* Overlay */}
      <header className="bg-amber-800 text-white py-4 shadow-md fixed top-0 w-full z-10">
        <h1 className="text-center text-3xl font-bold">Brewery Catalog</h1>
      </header>
      <main className="container mx-auto pt-24 pb-12 px-4 relative z-10">
        <ul className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {breweries && renderBreweries()}
        </ul>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            type="button"
            className="bg-amber-700 hover:bg-amber-600 text-white py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={decrementPage}
            disabled={currentIndex <= 1}
          >
            Prev
          </button>
          <button
            type="button"
            className="bg-amber-700 hover:bg-amber-600 text-white py-2 px-4 rounded"
            onClick={incrementPage}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
