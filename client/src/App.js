import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router } from "react-router-dom";

import AnimateRoutes from './components/AnimateRoutes/AnimateRoutes';


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
                <AnimateRoutes />
            </Router>
        </ApolloProvider>
    )
}

export default App;