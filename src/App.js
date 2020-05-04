import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';
import './css/Footer.css';
import './css/FeaturedMovies.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
