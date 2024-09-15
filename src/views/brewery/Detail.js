import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BreweryDetail() {
  const [brewery, setBrewery] = useState(null);
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
  }, [id]);

  // Function to format the phone number as (###) ###-####
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return phoneNumber;
    
    const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // Remove any non-digit characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber; // Return original number if format doesn't match
  };

  if (!brewery) return <div>Loading...</div>;

  const { name, city, state, postal_code, country, phone, website_url } = brewery;

  return (
    <div
    className="min-h-screen bg-cover bg-center bg-no-repeat relative"
    style={{
      backgroundImage: `url('/brewery.webp')`,
    }}
  >
    <header className="bg-gradient-to-r from-amber-700 to-amber-900 text-white py-4 shadow-md fixed top-0 w-full z-10 flex items-center">        <Link to="/breweries" className="ml-4 hover:text-amber-300">
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold mx-auto">{name}</h1>
      </header>
      <main className="container mx-auto pt-24 pb-12 px-4">
        <div className="bg-white shadow-md rounded-lg p-12">
          <h2 className="text-3xl font-semibold text-amber-800 mb-4">{name}</h2>
          <p className="text-gray-700 mb-1 text-lg">
            {city}, {state} {postal_code}
          </p>
          <p className="text-gray-700 mb-1">{country}</p>
          {phone && (
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Phone:</span> {formatPhoneNumber(phone)}
            </p>
          )}
          {website_url && (
            <p className="mt-4">
              <a
                href={website_url}
                target="_blank"
                rel="noreferrer"
                className="text-amber-700 hover:text-amber-600 font-semibold"
              >
                Visit Website
              </a>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
