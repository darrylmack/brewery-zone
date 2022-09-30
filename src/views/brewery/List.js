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
    let currentPage = currentIndex;
    currentPage = currentPage + 1;
    setCurrentIndex(currentPage);
  };

  const decrementPage = () => {
    let currentPage = currentIndex;
    currentPage = currentPage - 1;
    setCurrentIndex(currentPage);
  };

  const renderBreweries = () => {
    const breweryList = breweries.map((brewery) => {
      const { id, name, city, state, website_url } = brewery;

      return (
        <li key={id} className="flex flex-col cursor-pointer pb-3">
          <div className="border p-4">
            <Link
              to={`/breweries/${id}`}
              className="font-semibold text-lg hover:text-blue-600"
            >
              {name}
            </Link>
            <p>
              {city}, {state}
            </p>
          </div>
        </li>
      );
    });

    return breweryList;
  };

  return (
    <main className="container w-full mx-auto pt-12 justify-center pb-32">
      <h1 className=" font-bold text-3xl mb-4">Brewery Catalog</h1>
      <ul className="md:max-w-xl">{breweries && renderBreweries()}</ul>
      <button
        type="button"
        className=" bg-blue-700 hover:bg-blue-600 text-white py-4 px-8 rounded-md mr-2 mt-4 disabled:bg-gray-400 disabled:cursor-default"
        onClick={decrementPage}
        disabled={currentIndex <= 1}
      >
        Prev
      </button>
      <button
        type="button"
        className=" bg-blue-700 hover:bg-blue-600 text-white py-4 px-8 rounded-md mx-2"
        onClick={incrementPage}
      >
        Next
      </button>
    </main>
  );
}
