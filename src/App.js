import React from 'react';
//import logo from './logo.svg';
import './App.css';
// Route 
import { Route } from 'react-router-dom';
// components
import Header from './components/header';
import MovieList from './pages/movieList';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Route path='/' component={MovieList} />
      </div>
    );
  }
}

export default App;
