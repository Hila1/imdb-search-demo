import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './MovieData.css';

function MovieData() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);
  const apiToken = "8010b9d3"
  const params = useParams();

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${apiToken}&i=${params.id}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          console.log(result);
          setData(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );

  }, []);

  if (error) {
    console.log(`error: ${error.message}`)
    return <>{error.message}</>;
  } else if (!isLoaded) {
    console.log(`loading`)

    return <>loading...</>;
  } else {
    console.log(data)
    return (
      <body>
        <div className="modal-visible">
          <div className="modal-content">
            <div className="modal-header">
              <Link className="close" to="/">X</Link>
              <h2>{data.Title}</h2>
            </div>
            <div className="modal-body">
              <img src={data.Poster} alt={data.Title} />
              <p>{data.Plot}</p>
              <h2>{data.Actors}</h2>
            </div>
            <div className="modal-footer">
              <h3>year:{data.Year}</h3>
              <h3>rating:{data.imdbRating}</h3>
              <h3>votes:{data.imdbVotes}</h3>
            </div>
          </div>

        </div>
      </body>
    );
  }
}
  export default MovieData;
