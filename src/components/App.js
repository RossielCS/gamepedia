import React from 'react';
import '../assets/stylesheet/App.css';
import Header from './Header';
import GamesList from '../containers/GamesList';
import Footer from './Footer';

const App = () => (
  <div className="App">
    <Header />
    <GamesList />
    <Footer />
  </div>
);

export default App;
