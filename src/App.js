import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

import './App.css';
// Route 
import { Route, Switch } from 'react-router-dom';
// components
import Header from './components/header';
import Homepage from './components/homepage';
import Footer from './components/footer';
import MovieList from './pages/movieList';
import ManageMovie from './pages/admin/manageMovie';
import MovieDetail from './pages/movieDetail';
import Register from './pages/register';
import Login from './pages/login';
import SeatRes from './pages/seatReservation'
import Cart from './pages/user/cart';
import Checkout from './pages/checkout';
import HistoryTransaction from './pages/historyTransaction';
import ChangePasswordPage from './pages/user/changePassword';
import ChangeUsernamePage from './pages/user/changeUsername';
import NotFound from './pages/notFound';
import { onRegisterSuccess } from './redux/actions/'
// Link URL API
import { UrlApi } from './supports/UrlApi';


class App extends React.Component {

  componentDidMount() {
    let username = localStorage.getItem('Username');
    let spreadData = {...username}
    // {"id":
    let checkId = spreadData[0] + spreadData[1] + spreadData[2] + spreadData[3] + spreadData[4] + spreadData[5]
    
    if(checkId === '{"id":') {
      if (username !== null) {
        username = JSON.parse(username);
        if (username.id !== undefined) {
          if (username.status === "Login") {

            Axios.get(UrlApi + '/users?id=' + username.id)
              .then((res) => {
                if (res.data[0].role === 'admin') {
                  let obj = {
                    id: res.data[0].id,
                    username: res.data[0].username,
                    status: username.status,
                    role: res.data[0].role
                  }
                  this.props.onRegisterSuccess({ ...obj })
                } else {
                  let obj = {
                    id: res.data[0].id,
                    username: res.data[0].username,
                    status: username.status,
                    role: 'user'
                  }
                  this.props.onRegisterSuccess({ ...obj })
                }
              })
              .catch((err) => {
                console.log(err)
              })

          } else if (username.status === "Register") {

            Axios.get(UrlApi + '/users?username=' + username.username)
              .then((res) => {
                let obj = {
                  id: res.data[0].id,
                  username: res.data[0].username,
                  status: username.status,
                  role: 'user'
                }
                this.props.onRegisterSuccess({ ...obj })
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
      }
    } else {
      localStorage.clear()
    }
  }

  render() {
      return (
        <div>
          <Header />
          <Switch>
            <Route path='/' component={Homepage} exact />
            <Route path='/movies-list' component={MovieList} />
            <Route path='/manage' component={ManageMovie} exact />
            <Route path='/movie-detail' component={MovieDetail} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/change_password' component={ChangePasswordPage} />
            <Route path='/change_username' component={ChangeUsernamePage} />
            <Route path='/order-seat' component={SeatRes} />
            <Route path='/cart' component={Cart} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/history_purchase' component={HistoryTransaction} />
            <Route path='*' component={NotFound} />
          </Switch>
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
