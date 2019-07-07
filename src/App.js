import React from 'react';
//import logo from './logo.svg';
import './App.css';
// Route 
import { Route } from 'react-router-dom';
// components
import Header from './components/header';
import Jumbotron from './components/jumbotron';
import Footer from './components/footer';
import MovieList from './pages/movieList';
import ManageMovie from './pages/admin/manageMovie';
import MovieDetail from './pages/movieDetail';
import Register from './pages/register';
import Login from './pages/login';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Route path='/' component={Jumbotron} exact />
        <Route path='/' component={MovieList} exact/>
        <Route path='/manage' component={ManageMovie} exact/>
        <Route path='/movie-detail' component={MovieDetail}/>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Footer />
      </div>
    );
  }
}

export default App;
