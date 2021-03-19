import React from 'react';
// import {Link} from 'react-router-dom';

function Register() {
    return(
    <>
    <h1>Register a New Account</h1>
    <form>
        <input type="email" placeholder="Email" name = "email"  ></input>
        <input type="password" placeholder="Enter Password" name = "password"  ></input>
        <input type="password" placeholder="Confirm Password" name = "cpassword"  ></input>
        <button type="submit">Register</button>
    </form>    
    </>
    );
}
export default Register;