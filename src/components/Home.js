import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import axios from "axios";

import './home.scss'
import movieNames from './movielist';
import ReactLoading from 'react-loading';

export default function Home (){

    const tmdbUrl = "https://api.themoviedb.org/3/movie/popular?api_key=da5b12deff4464ea34a1af0491d2207c";
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [topLoading, setTopLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lucky, setLucky] = useState(false);
    

    useEffect(()=>{
        fetchmovies();
    },[])

    async function iamFellingLucky (){
        setLucky(true);
        setTopLoading(true);
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
        setTopLoading(false);
        //console.log(randomMovieList);

        
    }

    async function fetchmovies(){
        try{
            const tmdbMovies = await axios.get(tmdbUrl)
            console.log(tmdbMovies.data);
            setMovies(tmdbMovies.data.results);
            setLoading(false);
            setTopLoading(false);
        }catch(err) {
            console.log(err);
        }
    }
    
    async function loadMore(){
        setLoading(true);
        try{
            const tmdbMovies = await axios.get(tmdbUrl+`&page=${currentPage+1}`)
            //console.log(tmdbUrl+`&page=${currentPage+1}`)
            //console.log(tmdbMovies.data);
            setCurrentPage(currentPage+1);
            let newDB = [...movies, ...tmdbMovies.data.results];
            //console.log(newDB);
            setMovies(newDB);
            setLoading(false);
        }catch(err) {
            console.log(err);
        }
    }
    
    function back2Home(){
        setLucky(false);
        setTopLoading(true);
        fetchmovies();
    }

    function renderMovies(){
        let allMovies = [...movies];
        return allMovies.map((movie, i)=>{
            return <MovieCard key={i} movie = {movie} />
        })
    }

    return(
        <div className="data-field">
            <div className="top-btns">
                {lucky && <button className="btn-def" onClick={back2Home}>Home</button>}
                <input placeholder="Search a movie here"/>
                <button className="btn-def">Search</button>
                <button className="btn-def" onClick={iamFellingLucky}>I m feeling lucky</button>
            </div>
            
            {topLoading&&<ReactLoading type={"bars"} color={"grey"} />}
            <div className="movie-display">
                {renderMovies()}
            </div>
            {loading&&<ReactLoading type={"bars"} color={"grey"} />}
            {!lucky&&<button className="btn-def" onClick={loadMore}>Load More</button>}
            <div className="footer-area">Made by Rahul Raina</div>
        </div>
    )
}