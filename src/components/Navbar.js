import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

    let username = window.localStorage.getItem("userData");

    if (!username) {
        return (
            <nav>
                <Link to="/signup">Sign Up</Link>
                <span> | </span>
                <Link to="/signin">Sign In</Link>
                <span> | </span>
                <Link to="/posts">Home Feed</Link>
                <span> | </span>
                <Link to="/users">Users</Link>
                <hr></hr>
            </nav>
        );
    }
    else {
        return (
            <nav>
                <Link to="/profile">Welcome, {username}!</Link>
                <span> | </span>
                <Link to="/signout">Sign Out</Link>
                <span> | </span>
                <Link to="/posts">Home Feed</Link>
                <span> | </span>
                <Link to="/users">Users</Link>
                <hr></hr>
            </nav>
        );
    }
}

export default Navbar;