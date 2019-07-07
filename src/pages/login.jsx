import React from 'react';
import Paper from '@material-ui/core/Paper';

export default class Login extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mt-5">
                        <Paper className='p-5'>
                            <h1>Login</h1>
                            <input type="text" className="form-control mt-3" placeholder='username' />
                            <input type="password" className="form-control mt-3" placeholder='password' />
                            <input type="button" className="btn btn-primary mt-5" value='Login' />
                        </Paper>
                        <p className='font-italic mt-3'>
                            Belum Punya Akun ? <a className='font-weight-bold' href='/register'>&raquo; Daftar Sekarang</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}