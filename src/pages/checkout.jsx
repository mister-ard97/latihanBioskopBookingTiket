import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { Table, TableBody, TableCell, TableRow, Paper, TableHead } from '@material-ui/core';
import { Button } from 'reactstrap';
import { UrlApi } from '../supports/UrlApi';
import { DeleteCartAll } from './../redux/actions'
import { ModalMisterMovie } from '../components/modal'

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

    renderCheckOutUI = () => {
        if (localStorage.getItem('Username') === null || this.state.CheckOutStatus === 'GoToHomePage') {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <div className='my-5 container text-white'>
                <div className='row'>
                    <div className='col-md-12 my-5'>
                        {this.ModalCheckOutStatus(this.state.CheckOutStatus)}
                        {this.changeTitleWebsite()}
                        <Paper className='p-5'>
                            <h2>Checkout Page</h2>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Booked Seat</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
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
                </div>
            </div>
        )
    }

    renderDataCheckOut = () => {
        let jsx = this.state.cart.map((val, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{val.titleMovie}</TableCell>
                    <TableCell>{val.bookedSeat}</TableCell>
                    <TableCell>Rp. {numeral(val.price).format(0, 0)}</TableCell>
                </TableRow>
            )
        })
        return jsx;
    }

    hitungBiaya = () => {
        let totalBiaya = 0;
        this.state.cart.forEach((val) => {
            totalBiaya += val.price
        })
        return totalBiaya
    }

    hitungKursi = () => {
        let totalKursi = 0;
        this.state.cart.forEach((val) => {
            totalKursi += val.bookedPosition.length
        })
        return totalKursi;
    }

    // Bayar Booking Tiket Agar bisa di tersimpan di JSON SERVER
    BayarBookingTiket = () => {
        // looping patch movies
        let DataTanggal = new Date();
        let monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let year = DataTanggal.getFullYear();
        let month = DataTanggal.getMonth();
        let day = DataTanggal.getDate();
        let hours = DataTanggal.getHours();
        let minutes = DataTanggal.getMinutes();
        let seconds = DataTanggal.getSeconds();

        let codeTransaction = 'MistMovTrx' + year + month + day + hours + minutes + seconds;
        let waktuCheckout = day + '-' + monthsName[month] + '-' + year + ' : ' + hours + ':' + minutes + ':' + seconds;

        this.state.cart.forEach((val) => {
            Axios.get(UrlApi + '/movies/' + val.idMovie)
                .then((res) => {
                    let dataSeat = [...res.data.booked, ...val.bookedPosition];
                    Axios.patch(UrlApi + '/movies/' + val.idMovie, {
                        booked: dataSeat
                    })
                        .then((res) => {
                            
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        
        this.state.cart.forEach((val) => {
            val.codeTransaction = codeTransaction
            val.userId = this.state.idUser 
        })
        
        let objTransaction = {
            codeTransaction: codeTransaction,
            userId: this.state.idUser,
            totalSeats: this.hitungKursi(),
            transactionTime: waktuCheckout,
            totalTransaction: this.hitungBiaya()
        }

        Axios.post(UrlApi + '/transaction', objTransaction)
            .then((res) => {
                this.state.cart.forEach((val) => {
                    Axios.post(UrlApi + '/transactionDetail', val)
                        .then(() => {
                            
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                this.props.DeleteCartAll();
                this.setState({ CheckOutStatus: true, cart: [] });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    ModalCheckOutStatus = (param) => {
        if (param) {
            return (
                <ModalMisterMovie
                    className='modal-md'
                    closeModal={this.toggle}
                    modal={this.state.modal}
                    ModalHeader='Checkout Success'
                    ModalBody={this.contentModal()}
                    ModalFooter={this.btnModal()}
                />
            )
        }
    }

    contentModal = () => {
        return (
            <div className='d-block text-center'>
                Proses Checkout Berhasil. <br />
                Terima Kasih Telah Menggunakan Aplikasi Booking Ticket MisterMovie
            </div>
        )
    }

    btnModal = () => {
        return (
            <div>
                <Button color="success" onClick={() => this.setState({ CheckOutStatus: 'GoToHomePage' })}>Back To Homepage</Button>{' '}
                <Button color="danger" onClick={this.toggle}>Cancel</Button>
            </div>
        )
    }

    toggle = () => {
        this.setState({ modal: !this.state.modal })
    }
 
    changeTitleWebsite = () => {
        document.title = 'Checkout for user ' + this.state.user;
    }

    render() {
        return (
            this.renderCheckOutUI()
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