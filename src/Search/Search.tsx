import './Search.css';
import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from "react";

function Search() {
  const [error, setError] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<any[]>([""]);
  const [movieTitle, setMovieTitle] = useState<string>("hey");
  const [q, setQ] = useState("");
  
  const apiToken = "8010b9d3"
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!movieTitle) return
    fetch(`http://www.omdbapi.com/?apikey=${apiToken}&s=${movieTitle}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.Search);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [movieTitle]);

  if (error) {
    console.log(`error: ${error.message}`)
    return <>{error.message}</>;
  } else if (!isLoaded) {
    console.log(`loading`)

    return <>loading...</>;
  } else {
    console.log(`showing results`)
    console.log(`search: ${items}`)

    return (
      <div className="wrapper">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <span className="sr-only">Search movies here</span>
            <button onClick={() => setMovieTitle(q)} className="sr-btn">
              Search
            </button>
          </label>
        </div>
        <ul className="card-grid">
          {items.map((item, index) => (
            <li key={index} onClick={() => {navigate(`/movie/${item.imdbID}`)}} >
              <article className="card" >
                <div className="card-image">
                  <img src={item.Poster} alt={item.Title} />
                </div>
                <div className="card-content">
                  <h2 className="card-name">{item.Title}</h2>
                  <ol className="card-list">
                    Year: {item.Year}
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}


export default Search;