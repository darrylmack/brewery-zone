import { Link } from "react-router-dom";

export default function BreweryDetail() {
  return (
    <main>
      <h1>Brewery Name</h1>
      <p>Brewtown, Oregon 12345</p>
      <p>United States</p>
      <p>8005551234</p>
      <p>
        <a href="https://example.com" target="_blank" rel="noreferrer">
          View Website
        </a>
      </p>
      <Link to="/breweries">Back to Breweries</Link>
    </main>
  );
}
