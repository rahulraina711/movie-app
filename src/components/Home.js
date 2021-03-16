import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from "axios";
import logo from './logo.png';
import './home.scss'
import movieNames from './movielist';
import ReactLoading from 'react-loading';

export default function Home (){

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchmovies();
    },[])

    async function fetchmovies (){
        const movieList = movieNames;
        const randomMovieList = [];
        for (let i = 0; i <= 19; i++) {
            var randomIdx = Math.floor(Math.floor(Math.random() * movieList.length));
            try{
                let title = movieList[randomIdx];
                console.log(title);
                const fetchInfo = await axios.get("https://www.omdbapi.com/?apikey=4e245984&t&t="+title);
                //console.log(fetchInfo.data);
                randomMovieList.push(fetchInfo.data);               
    
            }catch(err){
                console.log(err);
            }
        
        }
        setMovies(randomMovieList);
        setLoading(false);
        //console.log(randomMovieList);

        
    }
    function onClickReload(){
        window.location.reload();
    }

    function renderMovies(){
        let allMovies = [...movies];
        return allMovies.map((movie, i)=>{
            return <MovieCard key={i} movie = {movie} />
        })
    }

    return(
        <div className="data-field">
            <div className="nav-bar">
                <div className="logo"><img src={logo} onClick={onClickReload} alt="logo"/></div>
                <div className="website-title">Welcome to The Movie Database</div>
                <div className="more-options" >I'm Felling Lucky</div>
            </div>
            {loading&&<ReactLoading type={"bars"} color={"grey"} />}
            <div className="movie-display">
                {renderMovies()}
            </div>
            <div className="footer-area">Made by Rahul Raina</div>
        </div>
    )
}