import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [capital, setCapital] = useState('');
  const [country, setCountry] = useState('');
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await fetch(
        'https://countriesnow.space/api/v0.1/countries/capital'
      );
      const data = await res.json();

      setCountries(data.data);
    })();
  }, []);

  useEffect(() => {
    if (countries.length > 0) {
      const index = Math.floor(Math.random() * countries.length);
      setCountry(countries[index]['name']);
      setAnswer(countries[index]['capital']);
    }
  }, [countries]);

  const resetCountry = () => {
    const index = Math.floor(Math.random() * countries.length);
    setCountry(countries[index]['name']);
    setAnswer(countries[index]['capital']);
  };

  useEffect(() => {
    if (correct) {
      setShowCongrats(true);
    }
  }, [correct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (capital.toLowerCase() === answer.toLowerCase()) {
      setCorrect(true);
    }
  };

  return (
    <div>
      <h2>Capital quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter capital name for: {country}</label>{' '}
        <input
          type="text"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
        />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      <br />
      <button onClick={resetCountry}>reset quiz</button>
      {showCongrats && (
        <p>Congrats you have entered the correct capital of {country}</p>
      )}
    </div>
  );
}