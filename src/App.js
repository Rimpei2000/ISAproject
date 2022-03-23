import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from './Components/Auth'
import MainPage from "./Components/MainPage.js";
import Hero from "./Components/Hero";
import "./App.css";

const App = () => {

  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/Hero' element={<Hero />} />
          <Route path='/Auth' element={<Auth />}/>
      </Routes>
    </div>
  );
};

export default App;
