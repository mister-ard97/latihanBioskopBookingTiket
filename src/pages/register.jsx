import React from 'react';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
//import { TheatersSharp } from '@material-ui/icons';
import { OnRegisterSuccess } from '../redux/actions';


class Register extends React.Component {
    state = {
        error : '',
        loading: false
    }

    onBtnClickRegister = () => {
        var username = this.refs.username.value;
        var password = this.refs.password.value;
        var confirm = this.refs.confirm.value;
        if(username === '' || password === '' || confirm === '') {
            this.setState({error: 'Semua Form Harus Diisi'})
        } else {
            if(confirm !== password) {
                this.setState({ error: 'Password dan Konfirmasi Password harus sama' })
            } else {
                this.setState({loading: true})
                //Check Username udah ada atau belum
                Axios.get('http://localhost:2000/users?username=' + username)
                .then((res) => {
                    if(res.data.length > 0) {
                        this.setState({error: 'Username sudah ada', loading: false})
                    } else {
                        var obj = {username : username, password : password}
                        Axios.post('http://localhost:2000/users', obj)
                        .then((res) => {
                            this.props.OnRegisterSuccess(res.data)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
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
                 <div className="col-md-6 mt-5">
                    <Paper className='p-5 registerForm'>
                        <h1>Register</h1>
                        <input type="text" className="form-control mt-3" placeholder='username' ref='username'/>
                        <input type="password" className="form-control mt-3" placeholder='password' ref='password'/>
                        <input type="text" className="form-control my-3" placeholder='confirm password' ref='confirm'/>
                        {
                            this.state.error === '' ? null :
                            <div className='alert alert-danger'>
                                {this.state.error}
                                <span style={{float: "right", cursor: 'pointer', fontWeight: 'bold'}} 
                                onClick={() => this.setState({error: ''})}> x </span>
                            </div>
                        }
                        {
                            this.state.loading === true ? 
                            <Loader type='ThreeDots' color= 'black' width='40px'/> 
                            :
                            <input type="button" className="btn btn-primary mt-5" value='Register Now' onClick={this.onBtnClickRegister}/>
                        }
                    </Paper>
                    <p className='font-italic mt-3'>
                        Sudah Daftar ? <a className='font-weight-bold' href='/login'>&raquo; Login Sekarang</a>
                    </p>
                 </div>
             </div>
         </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {OnRegisterSuccess})(Register)