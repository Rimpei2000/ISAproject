import React from 'react';

const Login = (props) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        age,
        setAge,
        location,
        setLocation,
        handleLogin,
        handleSignUp,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError
    } = props;
    return (
        <section className="login">
            <div className="loginContainer">

                <label>Username</label>
                <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className="errorMessage">{emailError}</p>

                <label>Password</label>
                <input type="text" autoFocus required value={password} onChange={(e) => setPassword(e.target.value)} />
                <p className="errorMessage">{passwordError}</p>

                <label>Age</label>
                <input type="number" autoFocus value={age} onChange={(e) => setAge(e.target.value)} />

                <label for="location">Location</label>
                <select name="location" id="location-select" onChange={(e) => setLocation(e.target.value)}>
                  <option value="" disabled>--Please choose an location--</option>
                  <option value="vancouver">Vancouver</option>
                  <option value="northVancouver">North Vancouver</option>
                  <option value="burnaby">Burnaby</option>
                  <option value="richmond">Richmond</option>
                </select>


                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <button onClick={handleLogin}>Sign In</button>
                            <p>Don't have an account?<span onClick= {() =>setHasAccount(!hasAccount)}>Sign Up!</span></p>
                        </>
                    ) : (
                            <>
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
