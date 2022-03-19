import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  useEffect(() => {
    getMovie();
  }, []);
  const getMovie = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`
      )
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  return (
    <div className={styles.detail_wrap}>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={styles.detail_inner_wrap}>
          <h1>Detail</h1>
          <h2>{movie.title}</h2>
          <img
            className={styles.detail_img}
            src={movie.large_cover_image}
            alt={movie.title}
          />
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}
export default Detail;
