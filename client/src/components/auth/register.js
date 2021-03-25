import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setpasswordVerify] = useState("");

    function register(e) {
      e.preventDefault();
      try {
        const registerData = {email, password, passwordVerify};

        axios.post("http://localhost:5000/auth/", registerData);
      } catch (error) {
        console.error(error);
      }
    }

    return(
    <>
    <h1>Register a New Account</h1>
    <form onSubmit = {register}>
        <input type="email"
         placeholder="Email"
          name = "email" 
          onChange={(e)=> setEmail(e.target.value)} 
          value = {email}  />
        <input type="password" placeholder="Enter Password" name = "password" 
        onChange={(e)=> setPassword(e.target.value)} 
          value = {password} ></input>

        <input type="password" placeholder="Confirm Password" name = "passwordVerify"
        onChange={(e)=> setpasswordVerify(e.target.value)} 
          value = {passwordVerify}  ></input>
        <button type="submit">Register</button>
    </form>    
    </>
    );
}
export default Register;