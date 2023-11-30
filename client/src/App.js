import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import NoMatch from './pages/NoMatch';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Routes>
            <Route
              path="/"
              element={<Homepage />}
            />
            <Route
              path="/login"
              element={<Login />}
            />            
            <Route
              path="/register"
              element={<Register />}
            />            
            {/* 404 ROUTE vv */}
            <Route
              path="*"
              element={<NoMatch />}
            />
          </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
