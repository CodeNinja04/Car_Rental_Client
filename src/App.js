import logo from './logo.svg';
import './App.css';
import CarsList from './components/CarsList.js'
import Records from './components/Records.js';
import Record from "./components/Record.js";

import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Switch,
  Navigate,
} from "react-router-dom";
import ResponsiveAppBar from "./components/ResponsiveAppBar.js";


function App() {
  return (
    <div className="app">
      <div id="routes">
        <BrowserRouter>
          <ResponsiveAppBar />

          <Routes>
            <Route path="/" element={<CarsList />} />
            <Route path="/inventory" element={<Navigate replace to="/" />} />
            <Route path="/records" element={<Records />} />
            <Route path="/record" element={<Record />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;