import React from 'react';
import {Route, BrowserRouter, Switch, useParams} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home/Home';
import MovieDetails from './components/MovieDetails/MovieDetails';
import FeelingLucky from './components/FeelingLuck/FeelingLucky';
import Search from './components/Search/Search';
import Favorites from './components/Favorites/Favorites';

function Router(){

    function Child (){
        let {id} = useParams();
        return(
            <MovieDetails id={id} />
        )
    }

    function SearchChild (){
        let{id} = useParams();
        return(
            <Search id={id}/>
        )   
    }

    return(
        <BrowserRouter>
            <Navbar />
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/movie/:id" children={<Child />}></Route>
                    <Route path="/feelinglucky"><FeelingLucky /></Route>
                    <Route path="/search/:id" children={<SearchChild />}></Route>
                    <Route path="/favorites"><Favorites /></Route>
                </Switch>
        </BrowserRouter>
    )
}

export default Router;
