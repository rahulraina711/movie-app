import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import logo from './logo.png';

function Favourites() {
    let favList = [];
    const [favs, setFavs]=useState([]);

    useEffect(()=>{
        getFavs();
    },[])

    function getFavs() {
        for (let i = 0; i < localStorage.length; i++) {
            let name = localStorage.key(i);
            let poster = localStorage.getItem(localStorage.key(i));
            let details = {
                Title : name,
                Poster: poster
            }
            favList.push(details);
        }
        setFavs(favList);

    };
    
    function renderFavs(){
        let allMovies = [...favs];

        return allMovies.map((movie, i)=>{
            return <MovieCard key={i} movie = {movie} />
        })
    }

    return(
        <div className="data-field">
            <div className="nav-bar">
                <div className="logo"><img src={logo} alt="logo"/></div>
                <div className="website-title">Welcome to The Movie Database</div>
                <div className="more-options">I'm Felling Lucky</div>
            </div>
            <div className="movie-display">
                {renderFavs()}
            </div>
            <div className="footer-area">Made by Rahul Raina</div>
        </div>
    )

}

export default Favourites;