import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home/home';
import UserProfile from './pages/UserProfile/userprofile';
import Login from './pages/Login/login';
import SignUp from './pages/Signup/signup';
import NoMatch from './pages/NoMatch/nomatch';

import './App.css';

const httpLink = createHttpLink({
    uri: '/graphql',
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/profile/:username' element={<UserProfile />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/signup' element={<SignUp />} />
                    <Route path='*' element={<NoMatch />} />
                </Routes>
            </Router>
        </ApolloProvider>
    )
}

export default App;