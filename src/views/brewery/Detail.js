import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BreweryDetail() {
  const [brewery, setBrewery] = useState("");
  const baseURL = "https://api.openbrewerydb.org/breweries";
  const { id } = useParams();

  const fetchBrewery = async () => {
    const data = await fetch(`${baseURL}/${id}`).then((response) =>
      response.json()
    );
    setBrewery(data);
  };
  useEffect(() => {
    fetchBrewery();
  }, []);

  const { name, city, state, postal_code, country, phone, website_url } =
    brewery;

  if (!brewery) return <div>Loading...</div>;

  return (
    <main className="container w-full mx-auto pt-12 justify-center pb-32">
      <h1 className=" font-bold text-3xl mb-1">{name}</h1>
      <p>
        {city}, {state}
      </p>
      <p>{postal_code}</p>
      <p className="mb-2">{country}</p>
      <p>{phone}</p>
      <p className="mb-3 font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
        <a href={website_url} target="_blank" rel="noreferrer">
          View Website
        </a>
      </p>
      <Link to="/breweries">Back to Breweries</Link>
    </main>
  );
}
