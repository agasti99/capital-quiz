import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const [countries, setCountries] = useState([]);
  const [capital, setCapital] = useState('');
  const [country, setCountry] = useState('');
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

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
    setCapital('');
    setShowCongrats(false);
    setIncorrect(false);
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
    } else if (capital.toLowerCase() != answer.toLowerCase()) {
      setIncorrect(true);
    }
  };

  return (
    <div className="body">
      <div className="center">
        <div className="main">
          <h2>Capitals quiz</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Enter capital name for: {country}
              <br />
            </label>{' '}
            <br />
            <input
              type="text"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              placeholder="Enter capital here"
              required="required"
            />
            <br />
            <button type="button" onClick={handleSubmit} class="button">
              Submit
            </button>
          </form>

          <br />
          <button onClick={resetCountry} class="button">
            Reset Quiz
          </button>
        </div>
        {showCongrats && (
          <p className="congrats">
            Congrats you have entered the correct capital of {country}
          </p>
        )}
        {incorrect && (
          <p className="congrats">
            The correct answer for the capital of {country} is '{answer}'.
          </p>
        )}
      </div>
    </div>
  );
}
