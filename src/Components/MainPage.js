import React, { useState, useEffect} from "react";
import Login from './Login';
import Hero from './Hero'

function MainPage() {

  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [location, setLocation] = useState("");
//  const [emailError, setEmailError] = useState("");
  //const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }

  const clearErrors = () => {
  //  setEmailError("");
    //setPasswordError("");
  }

  const handleLogin = () => {
    clearErrors();

  };

  const handleSignUp = () => {
    clearErrors();

  };

  const authListener = () => {

  };

  useEffect(() => {

  }, []);

  return (
    <div>
         {user ? (
            <Hero/>
          ) : (
            <Login
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              age={age}
              setAge={setAge}
              location={location}
              setLocation={setLocation}
              handleLogin={handleLogin}
              handleSignUp={handleSignUp}
              hasAccount={hasAccount}
              setHasAccount={setHasAccount}
              //e//mailError={emailError}
              //passwordError={passwordError}
            />
          )}
    </div>
  )
}

export default MainPage
