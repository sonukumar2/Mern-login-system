import axios from 'axios';
import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function LogOutBtn() {
    const getLoggedIn = useContext(AuthContext);
    const history = useHistory();

    async function logOut() {
        await axios.get("http://localhhost:5000/auth/logout"); 
        await getLoggedIn();
        history.push("/");
    }

    return ( 
    <button onClick = {logOut} >
    logout
    </button>);
}

export default LogOutBtn;