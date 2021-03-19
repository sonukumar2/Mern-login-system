import React from 'react';
import {Browserrouter, Switch, Route, BrowserRouter} from 'react-router-dom';
import Register from './components/auth/register';
import Navbar from './components/layout/Navbar';


function Router() {
    return (
        <BrowserRouter>
        <Switch>
        <Navbar></Navbar>
            <Route exact path = "/">
                <div>Home</div>
            </Route>
            <Route path = "/login">
                <div>login</div>
            </Route>
            <Route path = "/register">
                <Register></Register>
            </Route>
            <Route path = "/customer">
                <div>Customer</div>
            </Route>
        </Switch>

        </BrowserRouter>
    )
}

export default Router;
