import React from 'react';
import { NavLink } from 'react-router-dom';

const Hero = ({handleLogout}) => {
    return (
        <section className="hero">
            <nav>
                <h2>Welcome to Outivity!</h2>
                <NavLink to='./Auth'>
                    <button>API documentation</button>
                </NavLink>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </section>
    );
};

export default Hero;