import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home/home';
import UserProfile from './pages/UserProfile/userprofile';

import './App.css';

const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql',
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
                    <Route path='/' element={<Home />}>
                    </Route>
                    <Route path='/userprofile' element={<UserProfile />}>
                    </Route>
                </Routes>
            </Router>
        </ApolloProvider>
    )
}

export default App;