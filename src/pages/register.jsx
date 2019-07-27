import React from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { onRegisterSuccess } from '../redux/actions';
import Loader from 'react-loader-spinner'; 

class Register extends React.Component {
    state = {
        error : '',
        loading: false
    }

    componentDidMount() {
        document.title = 'Register Page';
        document.body.style.backgroundImage = 'linear-gradient(to right, #c31432, #240b36)'
    }

    onBtnClickRegister = () => {
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let confirm = this.refs.confirm.value;

        if(username === '' || password === '' || confirm === '') {
            this.setState({error: 'Semua Data Harus Diisi.'})
        } else {
            if(confirm !== password) {
                this.setState({error: 'Password dan Confirm Password Harus Sama.'})
            } else {
                this.setState({loading: true});
                Axios.get('http://localhost:2000/users?username=' + username)
                .then((res) => {
                    if(res.data.length > 0) {
                        this.setState({ error: 'Username sudah ada', loading: false })
                    } else {
                        let obj = {
                            username,
                            password,
                            transaction: []
                        }
                        Axios.post('http://localhost:2000/users', obj)
                        .then((res) => {
                            let data = {
                                id: res.data.id,
                                username: res.data.username,
                                status: 'Register',
                                role: 'user'
                            }
                            console.log(data)
                            this.props.onRegisterSuccess({...data});
                            localStorage.setItem('Username', JSON.stringify(data));
                            localStorage.setItem('LogOut', 'False')
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        }
    }

    render() {
        if(this.props.user.username !== '') {
            return <Redirect to='/' />
        }
        return (
         <div className="container">
             <div className="row justify-content-center">
                 <div className="col-md-10 my-5">
                        <Paper className='p-4'>
                            <div className="row customForm">
                                <div className="col-md-6 border-right">
                                    <h1>Register</h1>
                                    <input type="text" className="form-control mt-3" placeholder='username' ref='username' />
                                    <input type="password" className="form-control mt-3" placeholder='password' ref='password' />
                                    <input type="text" className="form-control my-3" placeholder='confirm password' ref='confirm' />
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
                                            <input type="button" className="btn btn-primary mt-3 registerNowBtn" value='Register Now' onClick={this.onBtnClickRegister} />
                                    }

                                    <p className='font-italic mt-3'>
                                        Sudah Daftar ?  <Link to='/login'>&raquo; Login Sekarang</Link>
                                    </p>
                                </div>
                                <div className='d-none d-md-block col-md-6 text-center'>
                                    <img
                                        src="https://img.freepik.com/free-vector/red-cinema-chairs-vector-illustration_36244-85.jpg?size=626&ext=jpg"
                                        alt="" 
                                        className='img-fluid mt-5'/>
                                    <p className='lead mt-2'>
                                        - Dengan Mendaftar, kamu bisa booking tiket film yang kamu ingin tonton secara online -
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

export default connect(mapToStateProps, { onRegisterSuccess })(Register);