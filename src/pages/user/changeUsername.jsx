import React from 'react';
import { Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import { UrlApi } from '../../supports/UrlApi';
import Loader from 'react-loader-spinner';
import { onRegisterSuccess } from '../../redux/actions';
import { ModalMisterMovie } from '../../components/modal';
import { Button } from 'reactstrap';

class ChangeUsernamePage extends React.Component {
    state = {
        error: '',
        idUser: 0,
        username: '',
        statusUser: '',
        loading: false,
        modal: false,
        success: ''
    }

    componentDidMount() {
        let user = localStorage.getItem('Username');
        if (user !== null) {
            user = JSON.parse(user);
            this.setState({ idUser: user.id, username: user.username, statusUser: user.status})
        }
    }

    ChangeTitleWebsite = () => {
        document.title = 'Change Username Page for User ' + this.state.username;
    }

    ChangeUsername = () => {
        let newUsername = this.refs.changeUsername.value;
        if (newUsername === '') {
            this.setState({ error: 'Inputan Change Username tidak boleh kosong' })
        } else {
            Axios.patch(UrlApi + '/users/' + this.state.idUser, {
                username: newUsername
            })
                .then((res) => {
                    if(res.status === 200) {
                        let data = {
                            id: this.state.idUser,
                            username: newUsername,
                            status: this.state.statusUser,
                            role: 'user'
                        }
                        this.props.onRegisterSuccess({ ...data });
                        localStorage.setItem('Username', JSON.stringify(data));
                        this.setState({username: newUsername, success: 'Username has been changed', modal: true})
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    modalAlertUser = () => {
        this.refs.changeUsername.value = '';
        return (
            <ModalMisterMovie 
                className='modal-md'
                closeModal={this.toggle}
                modal={this.state.modal}
                ModalHeader='Username Changed'
                ModalBody={<p>{this.state.success}</p>}
                ModalFooter={<Button color="success" onClick={() => this.toggle()}>Ok</Button>}
            />
        )
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }

    render() {
        if (localStorage.getItem('Username') === null) {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <div className='my-5 container px-0 text-white'>
                {this.ChangeTitleWebsite()}
                <Paper className='p-5 bgRoot CartStyle'>
                    <h2>Change Username</h2>
                    <h5>Username Sekarang: <span>{this.state.username}</span></h5>
                    <input type="text" className="form-control mt-3" placeholder='Change Username' ref='changeUsername' />
                    {
                        this.state.error === '' ? null :
                            <div className='alert alert-warning mt-3'>
                                {this.state.error}
                                <span style={{ float: "right", cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={() => this.setState({ error: '' })}> x </span>
                            </div>
                    }
                    {
                        this.state.loading === true ?
                            <Loader type='ThreeDots' color='black' width='40px' />
                            :
                            <input type="button" value='Change Username' className='btn btn-info mt-3' onClick={() => this.ChangeUsername()} />
                    }
                    {
                        this.state.success !== '' ?
                            this.modalAlertUser()
                        :
                            null
                    }
                </Paper>
            </div>
        )
    }
}

export default connect(null, { onRegisterSuccess })(ChangeUsernamePage);