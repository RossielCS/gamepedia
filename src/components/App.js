import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import GamesList from '../containers/GamesList';
import Footer from './Footer';
import '../assets/stylesheet/App.css';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={GamesList} />
        <Route path="/games/:id" component={GamesList} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
