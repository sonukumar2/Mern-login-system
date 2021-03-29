import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import LogOutBtn from '../../components/auth/logOutBtn';

function Navbar() {
    const { loggedIn } = useContext(AuthContext);
    return (
        <>
            <Link to="/">Home</Link>
            {
                loggedIn === false && <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">register</Link>
                </>
            }

            {
                loggedIn === true && <>
                    <Link to="/customer">Customer</Link>
                    <LogOutBtn></LogOutBtn>
                </>
            }

        </>
    );
}
export default Navbar;