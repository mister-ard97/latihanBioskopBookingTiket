import React from 'react';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import { connect } from 'react-redux';
import { UrlApi } from '../supports/UrlApi';
import { onRegisterSuccess } from '../redux/actions';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner'; 

class Login extends React.Component {
    state = {
        error: '',
        loading: false
    }
    componentDidMount() {
        document.title = 'Login Page'
        document.body.style.backgroundImage = 'linear-gradient(to right, #c31432, #240b36)';
    }

    onBtnLogin = () => {
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        if (username === '' || password === '') {
            if (username === '' && password === '') {
                this.setState({ error: 'Username dan Password harus diisi.' })
            } else if (username === '') {
                this.setState({ error: 'Username tidak boleh kosong' })
            } else {
                this.setState({ error: 'Password tidak boleh kosong' })
            }
        } else {
            this.setState({loading: true})
            Axios.get(UrlApi + '/users?username=' + username + '&password=' + password)
                .then((res) => {
                    if (res.data.length === 0) {
                        this.setState({ error: 'Username belum terdaftar. Silahkan daftar dahulu.', loading: false })
                    } else {
                        let data = {
                            id: res.data[0].id,
                            username: res.data[0].username,
                            password: res.data[0].password,
                            status: 'Login'
                        }
                        this.props.onRegisterSuccess({ ...data });
                        localStorage.setItem('Username', JSON.stringify(data));
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    
    render() {
        if (this.props.user.username !== '') {
            return <Redirect to='/' />
        }
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 mt-5">
                        <Paper className='p-4'>
                            <div className="row customForm">
                                <div className="col-md-6 border-right py-3">
                                    <h1>Login</h1>
                                    <input type="text" className="form-control mt-3" placeholder='username' ref='username'/>
                                    <input type="password" className="form-control my-3" placeholder='password' ref='password'/>
                                    {
                                        this.state.error === '' ? null :
                                            <div className='alert alert-danger'>
                                                {this.state.error}
                                                <span style={{ float: "right", cursor: 'pointer', fontWeight: 'bold' }}
                                                    onClick={() => this.setState({ error: '' })}> x </span>
                                            </div>
                                    }
                                    {
                                        this.state.loading === true ?
                                            <Loader type='ThreeDots' color='black' width='40px' />
                                            :
                                            <input type="button" className="btn btn-primary mt-3 registerNowBtn" value='Login' onClick={this.onBtnLogin} />
                                    }
                                    <p className='font-italic mt-3'>
                                        Belum Punya Akun ? <a className='font-weight-bold' href='/register'>&raquo; Daftar Sekarang</a>
                                    </p>
                                </div>
                                <div className='d-none d-md-block col-md-6 text-center'>
                                    <img
                                        src="https://img.freepik.com/free-vector/red-cinema-chairs-vector-illustration_36244-85.jpg?size=626&ext=jpg"
                                        alt=""
                                        className='img-fluid mt-5' />
                                    <p className='lead mt-2'>
                                        - Segera Login dan Dapatkan Kemudahan Booking Tiket Secara Online -
                                    </p>
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
            </div>
        )
    }
}

const mapToStateProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapToStateProps, { onRegisterSuccess })(Login);