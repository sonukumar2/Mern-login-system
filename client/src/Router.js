import React from 'react';
import {useContext} from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/auth/login';
import Register from './components/auth/register';
import Navbar from './components/layout/Navbar';
import AuthContext from './context/AuthContext';

function Router() {
    const { loggedIn } = useContext(AuthContext);
    return (
        <BrowserRouter>
        <Navbar></Navbar>
            <Switch>              
                <Route exact path="/">
                    <div>Home</div>
                </Route>
                {
                loggedIn === false && <>
                <Route path="/login">
                    <Login></Login>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                </>
            }

            {
                loggedIn === true && <>
                <Route path="/customer">
                    <div>Customer</div>
                </Route>
                </>
            }
                
                
            </Switch>

        </BrowserRouter>
    )
}

export default Router;
