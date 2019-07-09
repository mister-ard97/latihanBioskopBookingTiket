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
import SeatRes from './pages/seatReservation'
import Cart from './pages/user/cart';
import { onRegisterSuccess } from './redux/actions/'
// Link URL API
import { UrlApi } from './supports/UrlApi';


class App extends React.Component {
  componentDidMount() {
    let username = localStorage.getItem('Username');

    if(username !== null) {
      username = JSON.parse(username);

      if (username.status === "Login") {

        let obj = {
          id: username.id,
          username: username.username,
          password: username.password,
          status: username.status
        }
        console.log(obj)
        this.props.onRegisterSuccess({ ...obj });

      } else if (username.status === "Register") {

        Axios.get(UrlApi + '/users?username=' + username.username)
          .then((res) => {
            console.log(res.data)
            let obj = {
              id: res.data[0].id,
              username: res.data[0].username,
              password: res.data[0].password,
              status: username.status
            }
            console.log(obj)
            this.props.onRegisterSuccess({ ...obj })
          })
          .catch((err) => {
            console.log(err)
          })
      }
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
        <Route path='/order-seat' component={SeatRes} />
        <Route path='/cart' component={Cart} />
        <Footer />
      </div>
    );
  }
}

const mapToStateToProps = (state) => {
  return {
    user: state.user 
  }
}

export default connect(mapToStateToProps, { onRegisterSuccess })(App);
