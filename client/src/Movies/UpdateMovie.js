import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovie = props => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        console.log("This is your console log!", res);
        setMovie(res.data);
      })
      .catch(err => {
        console.log("We definitely broke it:", err);
      });
  }, [props.match.params.id]);

  const handleChanges = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(response => {
        console.log(response);
        props.history.push(`/movies/${movie.id}`);
      })
      .catch(error => {
        console.log("Your put request broke:", error);
      });
  };

  return (
    <div>
      <h3>Update Your Movies!</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Movie Title"
          value={movie.title}
          onChange={handleChanges}
        />
        <input
          type="text"
          id="director"
          name="director"
          placeholder="Movie Director"
          value={movie.director}
          onChange={handleChanges}
        />
        <input
          type="text"
          id="metascore"
          name="metascore"
          placeholder="Movie Metascore"
          value={movie.metascore}
          onChange={handleChanges}
        />
        <input
          type="text"
          id="stars"
          name="stars"
          placeholder="Movie Stars"
          value={movie.stars}
          onChange={handleChanges}
        />
        <button type="submit"> Update Now! </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
