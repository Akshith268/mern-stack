import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Search from './pages/Search';
import UserPage from './pages/Test';
import './pages/tailor.js';
import Tailor from './pages/tailor.js';
function App() {
 
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        <Route path="/home" exact element={<Home/>} />
        {/* <Route path="/search" exact element={<Search/>}/> */}
        <Route path="/test" exact element={<UserPage/>}/>
        <Route path="/tailor" exact element={<Tailor/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
