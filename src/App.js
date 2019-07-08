import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
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
import { onRegisterSuccess } from './redux/actions/'
// Link URL API
import { UrlApi } from './supports/UrlApi';

class App extends React.Component {
  componentDidMount() {
    var username = localStorage.getItem('Username');
    username = (username) ? JSON.parse(username) : [];
    console.log(
      'id:' + username[0] + 'user:' + username[1] + 'password:' + username[2] + 'status:' + username[3])
    if (username.length < 3) {
      let objLogin = () => {
        return {
          id: username[0],
          username: username[1],
          password: username[2],
          status: username[3]
        }
      }
      this.props.onRegisterSuccess(this.objLogin());
    }
  }

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

export default connect(null, { onRegisterSuccess })(App);
