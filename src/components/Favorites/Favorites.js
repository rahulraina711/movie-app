import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';

function Favorites() {
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
                Poster: poster.split(" ")[1],
                id:poster.split(" ")[0]
            }
            favList.push(details);
        }
        setFavs(favList);

    };
    
    function renderFavs(){
        let allMovies = [...favs];

        return allMovies.map((movie, i)=>{
            return <MovieCard key={i} movie = {movie} isFav={true} />
        })
    }

    return(
        <div className="data-field">
            <div className="movie-display">
                {favs.length>0?renderFavs():<div className="empty-favs">Looks pretty empty here</div>}
            </div>
            <div className="footer-area">Made by Rahul Raina</div>
        </div>
    )

}

export default Favorites;