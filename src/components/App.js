import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import GamesList from '../containers/GamesList';
import Game from '../containers/Game';
import Footer from './Footer';
import '../assets/stylesheet/style.scss';

const App = () => (
  <Router>
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" exact component={GamesList} />
        <Route path="/search/:query" component={GamesList} />
        <Route path="/games/:id" exact component={Game} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
