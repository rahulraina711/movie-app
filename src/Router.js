import React from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';

function Router(){
    return(
        <BrowserRouter>
            <Navbar />
                <Switch>
                    <Route exact path="/"><Home /></Route>
                </Switch>
        </BrowserRouter>
    )
}

export default Router;
