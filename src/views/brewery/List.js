import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BreweryList() {
  const [breweries, setBreweries] = useState([]);

  const baseURL = "https://api.openbrewerydb.org/breweries";

  const fetchBreweries = async () => {
    const data = await fetch(baseURL).then((response) => response.json());
    setBreweries(data);
  };

  useEffect(() => {
    fetchBreweries();
  }, []);

  const renderBreweries = () => {
    const breweryList = breweries.map((brewery) => {
      const { id, name, city, state, website_url } = brewery;
      return (
        <li key={id}>
          <Link to={website_url}>{name}</Link> -{city}, {state}
        </li>
      );
    });

    return breweryList;
  };

  return (
    <main>
      <h1 className=" font-bold text-2xl">Brewery Catalog</h1>
      <ul>{breweries && renderBreweries()}</ul>
      <button type="button">Prev</button> <button type="button">Next</button>
    </main>
  );
}
