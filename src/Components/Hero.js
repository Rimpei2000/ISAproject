import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (window.localStorage.getItem("login") === 'false') {
      navigate("/")
    }
  }, [])

  const logout = () => {
    window.localStorage.setItem("login", false);
    console.log("ddd")
  }
    return (
        <section className="hero">
            <nav>
                <h2>Welcome to Outivity!</h2>
                <NavLink to='./Auth'>
                    <button>API documentation</button>
                </NavLink>
                <button onClick={logout}>Logout</button>
            </nav>
        </section>
    );
};

export default Hero;
