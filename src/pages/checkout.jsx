import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { Table, TableBody, TableCell, TableRow, Paper, Container, TableHead } from '@material-ui/core';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UrlApi } from '../supports/UrlApi';
import { DeleteCartAll } from './../redux/actions'

var numeral = require('numeral')

class CheckOutPage extends React.Component {

    state = {
        cart: [],
        idUser: 0,
        totalBiaya: 0,
        cartCount: 0,
        CheckOutStatus: false,
        modal: true
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let username = localStorage.getItem('Username');
        if (username !== null) {
            username = JSON.parse(username);
            this.setState({ idUser: username.id, user: username.username, cart: this.props.cart, cartCount: this.props.cartCount})
        }
    }

    renderDataCheckOut = () => {
        let jsx = this.state.cart.map((val, index) => {
            return (
                <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{val.titleMovie}</TableCell>
                    <TableCell>{val.bookedSeat}</TableCell>
                    <TableCell>Rp. {numeral(val.price).format(0, 0)}</TableCell>
                </TableRow>
            )
        })
        return jsx;
    }

    hitungBiaya = (param) => {
        let totalBiaya = 0;
        this.state.cart.findIndex((val) => { totalBiaya += val.price })
        return totalBiaya
    }

    // Bayar Booking Tiket Agar bisa di tersimpan di JSON SERVER
    BayarBookingTiket = () => {
        // looping patch movies
        var regexSpace = / /g;
        this.state.cart.forEach((val) => {
            Axios.patch(UrlApi + '/movies/' + val.idMovie, {
                booked: val.bookedPosition
            })
            .then((res) => {

            })
            .catch((err) => {
                console.log(err)
            })
        })

       Axios.get(UrlApi + '/users/' + this.state.idUser)
       .then((res) => {
            let dataCart = res.data.transaction;
            dataCart.push(this.state.cart)
           Axios.patch(UrlApi + '/users/' + this.state.idUser, {
               transaction: dataCart
           })
            .then((res) => {
                this.props.DeleteCartAll();
                this.setState({ CheckOutStatus: true, cart: [] })
            })
            .catch((err) => {
                console.log(err)
            })
       })
       .catch((err) => {

       })
    }

    ModalCheckOutStatus = (param) => {
        if (param) {
            return (
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Checkout Success</ModalHeader>
                    <ModalBody className='text-center'>
                        <img 
                            src="https://c7.uihere.com/files/167/795/819/check-mark-checkbox-computer-icons-clip-art-checklist.jpg" 
                            alt="checklist"
                            style={{width: '50px'}}    
                        />
                        Proses Checkout Berhasil. <br />
                        Terima Kasih Telah Menggunakan Aplikasi Booking Ticket MisterMovie
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => this.setState({ CheckOutStatus: 'GoToHomePage' })}>Back To Homepage</Button>{' '}
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )
        }
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
 
    changeTitleWebsite = () => {
        document.title = 'Checkout for user ' + this.state.user;
    }

    render() {
        if (localStorage.getItem('Username') === null || this.state.CheckOutStatus === 'GoToHomePage') {
            return (
                <Redirect to='/' />
            )
        } 
        return (
            <div className='my-5 container-fluid px-0 text-white'>
                {this.ModalCheckOutStatus(this.state.CheckOutStatus)}
                {this.changeTitleWebsite()}
                <Paper className='p-5'>
                    <h2>Checkout Page</h2>
                    <Table>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Booked Seat</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.cart.length === 0 ?
                                    <TableRow>
                                        <TableCell colSpan='5' className='text-center'>Data Checkout Kosong.</TableCell>
                                    </TableRow>
                            :

                            this.renderDataCheckOut()
                            }
                        </TableBody>
                    </Table>
                    <h4 className='mb-3'>Total Biaya: Rp. {numeral(this.hitungBiaya()).format(0, 0)}</h4>
                    <div className='d-flex justify-content-end'>
                        { 
                            this.state.cart.length !== 0 ?
                                <input type="button" value='Pay' className='btn btn-success' onClick={() => this.BayarBookingTiket()} />
                            :
                                null
                        
                        }
                    </div>
                </Paper>
            </div>
        )
    }
}

const mapToStateProps = (state) => {
    return {
        cart: state.cart.cart,
        cartCount: state.cart.count
    }
}

export default connect(mapToStateProps, {DeleteCartAll})(CheckOutPage)