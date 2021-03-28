import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

import Navbar from './layouts/navbar/Navbar'
import Main from './layouts/main/Main'
import Footer from './layouts/footer/Footer'

import ScrollToTop from './components/scrollToTop/ScrollToTop'

function App() {

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <div className="app__wrapper">
          <Navbar />
          <Main />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
