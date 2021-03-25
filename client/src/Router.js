import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Register from './components/auth/register';
import Navbar from './components/layout/Navbar';

function Router() {
    return (
        <BrowserRouter>
        <Navbar></Navbar>
            <Switch>              
                <Route exact path="/">
                    <div>Home</div>
                </Route>
                <Route path="/login">
                    <div>login</div>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/customer">
                    <div>Customer</div>
                </Route>
            </Switch>

        </BrowserRouter>
    )
}

export default Router;
