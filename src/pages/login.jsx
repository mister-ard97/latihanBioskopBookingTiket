import React from 'react';
import Paper from '@material-ui/core/Paper';

class Login extends React.Component {
    componentDidMount() {
        document.title = 'Login Page'
        document.body.style.backgroundImage = 'linear-gradient(to right, #c31432, #240b36)'
    }
    
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10 mt-5">
                        <Paper className='p-4'>
                            <div className="row customForm">
                                <div className="col-md-6 border-right py-3">
                                    <h1>Login</h1>
                                    <input type="text" className="form-control mt-3" placeholder='username' />
                                    <input type="password" className="form-control mt-3" placeholder='password' />
                                    <input type="button" className="btn btn-primary mt-5" value='Login' />

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

export default Login;