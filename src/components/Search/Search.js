import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import axios from "axios";
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

export default function Search (props){
    const [topLoading, setTopLoading] = useState(false);
    const[loading, setLoading] = useState(true);
    const[movies, setMovies] = useState([]);
    const apiUrl = "https://api.themoviedb.org/3/search/movie?api_key=da5b12deff4464ea34a1af0491d2207c&query="+props.id;
    const [canLoad, setCanLoad] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

   useEffect(()=>{
       search();
   },[])

    async function search(query){
        
        try{
            const tmdbMovies = await axios.get(apiUrl);
            console.log(tmdbMovies.data);
            tmdbMovies.data.total_pages > 1 ? setCanLoad(true) : setCanLoad(false)
            setMovies(tmdbMovies.data.results);
            setLoading(false);
            setTimeout(()=>{
                setTopLoading(false);
            },1000)

        }catch(err) {
            console.log(err);
        }
    }
    
    async function loadMore(url){
        setLoading(true);
        try{
            const tmdbMovies = await axios.get(url+`&page=${currentPage+1}`)
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
            return <MovieCard key={i} movie = {movie} ldx={i}/>
        })
    }

    return(
        <div className="data-field">
            <div className="top-btns">
                <Link to="/"><button className="btn-def">Return</button></Link>
            </div>
            
            {topLoading&&<ReactLoading type={"bars"} color={"grey"} />}
            <div className="movie-display">
                {renderMovies()}
            </div>
            {loading&&<ReactLoading type={"bars"} color={"grey"} />}
            {canLoad&&<button className="btn-def" onClick={()=>{loadMore(apiUrl)}}>Load More</button>}
            <div className="footer-area">Made by Rahul Raina</div>
        </div>
    )
}