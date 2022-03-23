import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate()
    const {
        email,
        setEmail,
        password,
        setPassword,
        age,
        setAge,
        location,
        setLocation,
        hasAccount,
        setHasAccount,
        //emailError,
        //passwordError
    } = props;

    const handleLogin = async() => {
      console.log(email)
      console.log(password)
    }

    const handleSignUp = async() => {
      console.log(email)
      console.log(password)
      console.log(age)
      console.log(location)

      let values = {
        newUserName: email,
        newUserPassword: password,
        newUserAge: age,
        newUserLocation: location
      }

      Axios.post('http://localhost:7700/', {
        newUserName: values.newUserName,
        newUserPassword: values.newUserPassword,
        newUserAge: values.newUserAge,
        newUserLocation: values.newUserLocation,
      })
      .then(res => {
        if (res.status == 200) {
          //navigate('/MainPage')
          window.localStorage.setItem("login", true)
          navigate('/Hero')
        }

      })
    }

    return (
        <section className="login">
            <div className="loginContainer">
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <label>Username</label>
                        <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />


                        <label>Password</label>
                        <input type="text" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />

                        <button onClick={handleLogin}>Sign In</button>
                            <p>Don't have an account?<span onClick= {() =>setHasAccount(!hasAccount)}>Sign Up!</span></p>
                        </>
                    ) : (
                            <>

                            <label>Username</label>
                            <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />


                            <label>Password</label>
                            <input type="text" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />


                            <label>Age</label>
                            <input type="number" autoFocus value={age} onChange={(e) => setAge(e.target.value)} />

                            <label for="location">Location</label>
                            <select name="location" id="location-select" onChange={(e) => setLocation(e.target.value)}>
                              <option value="">--Please choose an location--</option>
                              <option value="1">Vancouver</option>
                              <option value="4">North Vancouver</option>
                              <option value="2">Burnaby</option>
                              <option value="3">Richmond</option>
                            </select>


                                <button onClick={handleSignUp}>Sign Up</button>
                                <p>Already have an account?<span onClick={() => setHasAccount(!hasAccount)}>Sign In!</span></p>
                            </>
                    )
                    }
                </div>

            </div>
        </section>
    );
};

export default Login;
