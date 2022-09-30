import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BreweryList() {
  const [breweries, setBreweries] = useState([]);

  const renderBreweries = () => {
    const breweryList = breweries.map((brewery) => {
      const { name, city, state } = brewery;
      return (
        <li>
          <Link to="/breweries/example-brewery">{name}</Link> -{city}, {state}
        </li>
      );
    });
  };
  return (
    <main>
      <h1>Brewery Catalog</h1>
      <ul>
        <li>
          <Link to="/breweries/example-brewery">Example Brewery</Link> -
          Brewtown, OR
        </li>
      </ul>
      <button type="button">Prev</button> <button type="button">Next</button>
    </main>
  );
}
