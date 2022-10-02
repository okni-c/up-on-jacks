import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home/home';
import UserProfile from './pages/UserProfile/userprofile';

import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />}>
                </Route>
                <Route path='/userprofile' element={<UserProfile />}>
                </Route>
            </Routes>
        </Router>
    )
}

export default App;