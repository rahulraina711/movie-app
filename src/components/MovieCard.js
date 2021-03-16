import React, { useEffect, useState } from 'react';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './moviecard.scss';

export default function MovieCard(props){
    const [like,setLike] = useState("primary");

    useEffect(()=>{
        checkLikedMovies();
    },[])

    function checkLikedMovies () {
        let likedMovies = [];
        for (let i = 0; i < localStorage.length; i++) {
            var name = localStorage.key(i);
            likedMovies.push(name);

        }
        //console.log(likedMovies);

        if(likedMovies.includes(props.movie.Title)){
            setLike("secondary");
        }
    }

    function likeHandler(){
        if(like==="primary"){
            setLike("secondary");
            localStorage.setItem(props.movie.Title, props.movie.Poster);
        }
        else if (like==="secondary"){
            setLike("primary");
            localStorage.removeItem(props.movie.Title);
        }
        
    }

    return(
        <div className="movie-card">
            <div className="a2f" onClick={likeHandler}>
            <Fab enabled="true" color={like} aria-label="like">
                <FavoriteIcon />
            </Fab>
            </div>
            <div className="image"><img src={props.movie.Poster} alt="poster_image"/></div> 
            <div className="title">{props.movie.Title}</div>           
        </div>
    )
}