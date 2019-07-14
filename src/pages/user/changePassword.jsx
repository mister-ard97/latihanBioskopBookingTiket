import React from 'react';
import {Paper} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { UrlApi } from './../../supports/UrlApi';
import Loader from 'react-loader-spinner';

class ChangePasswordPage extends React.Component {
    state = {
        error: '',
        idUser: 0,
        username: '',
        loading: false
    }


    componentDidMount() {
        
        let user = sessionStorage.getItem('Username');
        if (user !== null) {
            user = JSON.parse(user);
            this.setState({ idUser: user.id, username: user.username})
            document.title = 'Change Password Page for User' + this.state.username;
        }
    }

    ChangeUserPassword = () => {
        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmPassword.value;
        if(password !== confirmPassword) {
            this.setState({error: 'Password dan Confirm Password harus sama.'})
        } else {
            Axios.patch(UrlApi + '/users/' + this.state.idUser, {
                password: password
            })
            .then((res) => {
                alert('Password Berhasil Diganti');
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render() {
        if(sessionStorage.getItem('Username') === null ) {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <div className='my-5 container px-0 text-white'>
                <Paper className='p-5 bgRoot CartStyle'>
                    <h2>Change Password</h2>
                    <input type="password" className="form-control mt-3" placeholder='password' ref='password' />
                    <input type="text" className="form-control my-3" placeholder='confirm password' ref='confirmPassword' />
                    {
                        this.state.error === '' ? null :
                            <div className='alert alert-warning'>
                                {this.state.error}
                                <span style={{ float: "right", cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={() => this.setState({ error: '' })}> x </span>
                            </div>
                    }
                    {
                        this.state.loading === true ?
                            <Loader type='ThreeDots' color='black' width='40px' />
                            :
                            <input type="button" value='Change Password' className='btn btn-info' onClick={() => this.ChangeUserPassword()} />
                    }
                   
                </Paper>
            </div>
        )
    }
}

export default ChangePasswordPage;