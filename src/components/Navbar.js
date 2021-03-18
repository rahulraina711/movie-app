import React from 'react';
import {useHistory} from 'react-router-dom'
import './navbar.scss';
import logo from './logo.png';

function Navbar(){
    const history = useHistory();
    function onClickReload(){
        history.push('/');
    }

    return(
        <div className="nav-bar">
                <div className="logo"><img src={logo} onClick={onClickReload} alt="logo"/></div>
                <div className="website-title">Welcome to The Movie Database</div>
        </div>
    )
}

export default Navbar;