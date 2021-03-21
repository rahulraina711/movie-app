import React, {
    useEffect,
    useState
} from 'react';
import MovieCard from '../MovieCard/MovieCard';
import axios from "axios";
import ReactLoading from 'react-loading';
import {useHistory} from 'react-router-dom';
import './fl.scss';

export default function FeelingLucky() {

    const [randomMovies, setRandomMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(()=>{
        fetchRandomMovies();
    },[])

function HandleHome(){
    history.push("/");
}

    async function fetchRandomMovies() {
        setLoading(true);
        setRandomMovies([]);
        const randomMovieList = [];
        for (var i = 0; i <= 19; i++) {
            var randomIdx = (Math.floor(Math.random() * 50000));
            try {
                const fetchInfo = await axios.get("https://api.themoviedb.org/3/movie/" + randomIdx + "?api_key=da5b12deff4464ea34a1af0491d2207c");
                //console.log(fetchInfo.data);
                fetchInfo.data.poster_path && randomMovieList.push(fetchInfo.data);

            } catch (err) {
                console.log(err);
            }

        }
        setRandomMovies(randomMovieList);
        setLoading(false);
    }

    function renderMovies(){
        let allMovies = [...randomMovies];
        return allMovies.map((movie, i)=>{
            return <MovieCard key={i} movie = {movie} />
        })
    }

    return ( 

        <div className="data-field">
            <div className="top-btns">
                <button className="btn-def" onClick={HandleHome}>Home</button>
                <button className="btn-def" onClick={fetchRandomMovies}>Fetch Random</button> 
            </div>
           
            {loading && <ReactLoading type={"bars"} color={"grey"} />}
            <div className="movie-display">
                {renderMovies()}
            </div>
         <div className="footer-area">Made by Rahul Raina</div>
        </div>
    )
}