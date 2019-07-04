import React from 'react';
import Paper from '@material-ui/core/Paper';

export class Register extends React.Component {
    render() {
        return (
         <div className="container">
             <div className="row justify-content-center">
                 <div className="col-md-6 mt-5">
                    <Paper className='p-5'>
                        <h1>Register</h1>
                        <input type="text" className="form-control mt-3" placeholder='username' />
                        <input type="text" className="form-control mt-3" placeholder='password' />
                        <input type="text" className="form-control mt-3" placeholder='confirm password' />
                        <input type="button" className="btn btn-primary mt-5" value='Register Now' />
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