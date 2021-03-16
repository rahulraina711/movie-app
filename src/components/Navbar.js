import React, { useEffect, useState } from 'react';
import './navbar.scss';
import logo from './logo.png';

function Navbar(){
    // const [visited, setVisited] = useState(false);
    const [help, setHelp] = useState(true);

    useEffect(()=>{
        check4Help();
    },[])

    function check4Help(){
        if (localStorage.getItem('visited_this_site')){
            setHelp(false);
        }
    }

    function onClickReload(){
        window.location.reload();
    }

    function onClickHandler(){
        setHelp(false);
        localStorage.setItem('visited_this_site',true);
    }

    return(
        <div className="nav-bar">
                <div className="logo"><img src={logo} onClick={onClickReload} alt="logo"/></div>
                <div className="website-title">Welcome to The Movie Database</div>
                <div className="more-options" onClick={()=>{setHelp(true)}}>Help</div>
                {help&&(<div className="floating-box">
                    <div className="help">

                        <h1>Welcome to the MovieDB</h1>
                        <p>* Click on "Load More" button at the bottom to load more popular movies</p>
                        <p>* Click on "I'm felling lucky" to load random movie suggestions. To go back to earlier popular suggestions , click on "Home" button</p>
                        <p>* The more you click on "I'm felling lucky" , the more random movies suggestion you'll get</p>
                        <button className="btn-def" onClick={onClickHandler}>OK</button>

                    </div>
                </div>)}
        </div>
    )
}

export default Navbar;