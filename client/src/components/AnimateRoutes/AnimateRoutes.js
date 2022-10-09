import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";

import Home from '../../pages/Home/home';
import UserProfile from '../../pages/UserProfile/userprofile';
import Login from '../../pages/Login/login';
import SignUp from '../../pages/Signup/signup';
import NoMatch from '../../pages/NoMatch/nomatch';

import { AnimatePresence } from 'framer-motion';

function AnimateRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/profile/:username' element={<UserProfile />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimateRoutes