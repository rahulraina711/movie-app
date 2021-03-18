import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './navbar.scss';
import logo from './logo.png';

function Navbar(){
    const [toFavs, setToFavs] = useState("/favorites");
    const [text, setText] = useState("See Favorites");
    function handlerNav(){
        setToFavs("/favorites")&&setText("See Favorites");
        if(toFavs==="/favorites" ){
            setToFavs("/") ;
            setText("Return to Home");
        }
        else if(toFavs==="/"){
            setToFavs("/favorites");
            setText("See Favorites");
        }
    }
    return(
        <div className="nav-bar">
                <div className="logo"><a href="/"><img src={logo} alt="logo"/></a></div>
                <div className="website-title">Your one-stop movie search</div>
                <div className="more-options"><Link className="link" to={toFavs} onClick={handlerNav}>{text}</Link></div>
        </div>
    )
}

export default Navbar;