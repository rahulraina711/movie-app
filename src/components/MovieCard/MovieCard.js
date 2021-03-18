import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './moviecard.scss';
import { Link } from 'react-router-dom';

export default function MovieCard(props){
    const [like,setLike] = useState("primary");
    const poster_url = "https://image.tmdb.org/t/p/w300"+props.movie.poster_path;
    let likedMovies = [];

    useEffect(()=>{
        checkLikedMovies();
    },[])

    function checkLikedMovies () {
        if(localStorage.length===0){
             return console.log("no favs in storage")
            }
        else{
            for (let i = 0; i < localStorage.length; i++) {
                var name = localStorage.key(i);
                likedMovies.push(name);
    
            }
            console.log(likedMovies);
    
            if(likedMovies.includes(props.movie.original_title)){
                setLike("secondary");
        }
    }


    }

    function likeHandler(){
        
        if(like==="primary"){
            setLike("secondary");
            localStorage.setItem(props.movie.original_title, props.movie.id+" "+poster_url);
        }
        else if (like==="secondary"){
            setLike("primary");
            localStorage.removeItem(props.movie.original_title);
        }
        
    }

    return(
        <div className="movie-card">
            <div className="a2f" onClick={likeHandler}>
            {!props.isFav && (<Fab enabled="true" color={like} aria-label="like">
                <FavoriteIcon />
            </Fab>)}
            </div>
            <div className="image"><Link className="link" to={`/movie/${props.movie.id}`}><img className="poster" src={props.movie.Poster || poster_url} alt="poster_image" /></Link></div> 
            <div className="title" >{props.movie.Title || props.movie.original_title}</div>           
        </div>
    )
}