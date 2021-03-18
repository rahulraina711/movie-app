import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import axios from "axios";

import './home.scss'
import movieNames from '../MovieDetails/movielist';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

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

    function renderMovies(){
        let allMovies = [...movies];
        return allMovies.map((movie, i)=>{
            return <MovieCard key={i} movie = {movie} />
        })
    }

    return(
        <div className="data-field">
            <div className="top-btns">
                <input placeholder="Search a movie here"/>
                <button className="btn-def">Search</button>
                <Link to="/feelinglucky"><button className="btn-def">I m feeling lucky</button></Link>
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