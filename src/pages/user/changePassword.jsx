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
        loading: false,
        success: ''
    }


    componentDidMount() {
        
        let user = localStorage.getItem('Username');
        if (user !== null) {
            user = JSON.parse(user);
            this.setState({ idUser: user.id, username: user.username})
            document.title = 'Change Password Page for User' + this.state.username;
        }
    }

    ChangeUserPassword = () => {
        let passwordLama = this.refs.passwordLama.value;
        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmPassword.value;
        if(passwordLama === '' || password === '' || confirmPassword === '') {
            if(passwordLama === '') {
                this.setState({ error: 'Password Lama Harus di isi dlu' })
            } else if(password === '') {
                this.setState({ error: 'Password Baru Harus di isi dlu' })
            } else {
                this.setState({ error: 'Confirm Password Baru Harus di isi dlu' })
            }
           
        } else if(passwordLama !== '' && password !== confirmPassword) {

            this.setState({ error: 'Password dan Confirm Password harus sama.' })

        } else {
            this.setState({loading: true})
            Axios.get((UrlApi + '/users/' + this.state.idUser))
            .then((res) => {
                if(res.data.password === passwordLama) {
                        Axios.patch(UrlApi + '/users/' + this.state.idUser, {
                            password: password
                        })
                        .then((res) => {
                            this.refs.passwordLama.value = '';
                            this.refs.password.value = '';
                            this.refs.confirmPassword.value = '';
                            this.setState({error: '', loading: false, success: 'Password Berhasil Diubah'})

                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else {
                    this.setState({error: 'Password lama tidak cocok dengan data di database', loading: false})
                }
            }) 
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render() {
        if(localStorage.getItem('Username') === null ) {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <div className='my-5 container px-0 text-white'>
                <Paper className='p-5 bgRoot CartStyle'>
                    <h2>Change Password Username: {this.state.username}</h2>
                    {
                        this.state.success !== '' ? 
                            <div className='alert alert-success'>
                                {this.state.success}
                                <span style={{ float: "right", cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={() => this.setState({ success: '' })}> x </span>
                            </div>
                        :
                            null
                    }
                    <input type="password" className="form-control mt-3" placeholder='Password Lama' ref='passwordLama' />
                    <input type="password" className="form-control mt-3" placeholder='Password Baru' ref='password' />
                    <input type="text" className="form-control my-3" placeholder='Confirm Password Baru' ref='confirmPassword' />
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