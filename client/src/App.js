import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Grabs pages for routes
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
// import Footer from './components/Footer';

// Init graphql
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Grabs ID token if logged in
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Init client, link graphql to client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// App sends element route based on web URL
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">

          <Nav />

            <div className='container'>
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
            </div>

          {/* <Footer /> */}

        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
