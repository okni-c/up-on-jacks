import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";

import Home from '../../pages/Home/home';
import UserProfile from '../../pages/UserProfile/userprofile';
import Settings from '../../pages/Settings/settings'
import Login from '../../pages/Login/login';
import SignUp from '../../pages/Signup/signup';
import ManageBuilds from '../../pages/Builds/managebuilds';
import NoMatch from '../../pages/NoMatch/nomatch';

import { AnimatePresence } from 'framer-motion';

function AnimateRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/profile/:username' element={<UserProfile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/managebuilds' element={<ManageBuilds />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='*' element={<NoMatch />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimateRoutes