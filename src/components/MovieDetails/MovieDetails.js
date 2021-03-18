import './movie_details.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function MovieDetails (props){
    const tmdb = "https://api.themoviedb.org/3/movie/"+props.id+"?api_key=da5b12deff4464ea34a1af0491d2207c";
    const [movie, setMovie] = useState({});

    useEffect(()=>{
        fetchMovieDetails();
    },[])

    async function fetchMovieDetails(){
        const movieDetails = await axios.get(tmdb);
        console.log(movieDetails.data);
        setMovie(movieDetails.data);
    }
    return (
        <div className="movie-details">
            <div className="backdrop"><img className="backdrop-img" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}` || "https://via.placeholder.com/1200x600.png?text=404+Backdrop+Not+Found"} alt="backdrop"/></div>
            <div className="movie">
                <div className="poster"><img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="poster"/></div>
                <div className="movie-text">
                    <div className="title">{movie.original_title}</div>
                    <div className="plot">{movie.overview}</div>
                </div>
            </div>
            
        </div>
    )
}

export default MovieDetails;