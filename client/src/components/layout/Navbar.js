import React from 'react';
import {Link} from 'react-router-dom';

function Navbar() {
    return(
    <>
    <Link to ="/">Home</Link>
    <Link to ="/login">Login</Link>
    <Link to ="/register">register</Link>
    <Link to ="/customer">Customer</Link>
    </>
    );
}
export default Navbar;