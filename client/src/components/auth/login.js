import React, { useState } from 'react';
import {useContext} from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {getLoggedIn} = useContext(AuthContext);

    function login(e) {
        e.preventDefault();
        try {
            const loginData = { email, password };
            axios.post("http://localhost:5000/auth/login", loginData);
            getLoggedIn();
            setEmail(""); setPassword("");

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <h1>Login </h1>
            <form onSubmit={login}>
                <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" placeholder="Enter Email" name="email"></input>
                <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" placeholder="Enter Password" name="password"></input>
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;