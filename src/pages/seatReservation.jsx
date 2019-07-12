import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AddToCart } from './../redux/actions'
import Axios from 'axios';
import { Paper } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UrlApi } from '../supports/UrlApi';


var numeral = require('numeral')

class SeatRes extends Component {
    state = {
        idUser: 0,
        titleMovies: '',
        chosen: [],
        bookedSeat: [],
        modal: false,
        addToCartTicket: null
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.style.backgroundImage = 'linear-gradient(to right, #c31432, #240b36)';
        Axios.get(UrlApi + '/movies/' + this.props.location.state.id)
        .then((res) => {
            this.setState({bookedSeat: res.data.booked, idUser: this.props.idUser})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    ChangeTitleWebsite = (param) => {
        if(param !== '') {
            document.title = param + ' - Order Seat -';
        }
    }

    onSeatClick = (arr) => {
        let chosen = this.state.chosen
        chosen.push(arr)
        this.setState({ chosen: chosen })
    }

    onCancelSeatClick = (arr) => {
        let chosen = this.state.chosen
        let filter = chosen.filter((data) => {
           return data.join('') !== arr.join('')
        })
        this.setState({chosen: filter})
    }

    selectedSeat = (param) => {
       if(param.length !== 0) {
           return (
               <div className='text-white font-weight-bold'>
                    <p>For : {
                            this.state.chosen.length <= 1 ?
                            this.state.chosen.length + ' Person' 
                            : 
                            this.state.chosen.length + ' Persons' 
                        }</p>
                        <p>Total : Rp. {numeral(this.state.chosen.length * 30000).format(0,0)}</p>
                        <input type="button" onClick={() => this.addTicketToCart()} className='btn btn-danger Custnavbar' value='Add To Cart'/>
               </div>
           )
       }
    }

    BookedSeat = () => {
        let booked = this.state.chosen
        if(booked.length !== 0) {
            let arrAbjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            let arrBooked = [];

            for(let x = 0; x < booked.length; x++) {
                for(let y = 0; y < arrAbjad.length; y++) {
                    if(booked[x][0] === y) {
                        let dataBooked = [arrAbjad[y], (booked[x][1] + 1)].join('')
                        arrBooked.push(dataBooked);
                    }
                }
            }
            return arrBooked.join('-');
        }
    }

    addTicketToCart = () => {
        let idMovie = this.props.location.state.id;
        let title = this.props.location.state.title;
        let bookedSeatPosition = this.state.chosen;
        // let transaction = this.props.transaction;
        let price = this.state.chosen.length * 30000;
        let obj = {
            idMovie: idMovie,
            titleMovie: title,
            bookedSeat: this.BookedSeat(),
            bookedPosition: bookedSeatPosition,
            price: price
        }
        
        if(this.state.chosen !== 0) { 
               
            // let booked = this.props.location.state.booked
            // let arrBooked = [...booked, ...this.state.chosen]
            // Axios.patch(UrlApi + '/movies/' + this.props.location.state.id, {
            //     booked: arrBooked
            // })
            //     .then((res) => {
            //         // var obj = {
            //         //     title: this.props.location.state.title,
            //         //     qty: this.state.chosen.length,
            //         //     total: this.state.chosen.length * 35000
            //         // }
            //         // transaction.push(obj)
            //         // Axios.patch(UrlApi + '/users/' + this.props.idUser, {
            //         //     transaction: transaction
            //         // }).then((res) => {
            //         //     this.setState({purchaseTicket: false, bookedSeat: [...this.state.bookedSeat, ...this.state.chosen], chosen: []})
            //         // })
            //     })
            //     .catch((err) => {
            //         console.log(err)
            //     })

            this.setState({
                addToCartTicket: true, 
                bookedSeat: [...this.state.bookedSeat, ...this.state.chosen], 
                chosen: [], 
                modal: true 
            })
        }
        this.props.AddToCart(obj);
        // let objCart = {
        //     cart: this.props.cart,
        //     count: this.props.cartCount
        // }
        // localStorage.setItem('CartUser', JSON.stringify(objCart))
    }

    purchaseTiketAlert = (param) => {
        if(param) {
            return (
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Added To Cart</ModalHeader>
                    <ModalBody>
                        Tiket Booking telah ditambahkan ke Cart. <br/> 
                        Setelah di Cart harap melakukan Checkout agar bangku bisa ke booked oleh Anda.
                        <hr/>
                        <p>Note: Ketika page direfresh, maka data Cart akan kosong. Karena belum melakukan Checkout maka Booking Seat tidak tersimpan dalam database.</p>
                </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => this.setState({ addToCartTicket: 'GoToCart' })}>Go To Cart</Button>{' '}
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            ) 
        }
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }

    renderSeat = () => {
        let { seats } = this.props.location.state;
        let arr = [];
        let arrAbjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        for (let i = 0; i < seats / 20; i++) {
            arr.push([])
            for (let j = 0; j < seats/ (seats/20); j++) {
                arr[i].push(true)
            }
        }

        for (let i = 0; i < this.state.bookedSeat.length; i++) {
            arr[this.state.bookedSeat[i][0]][this.state.bookedSeat[i][1]] = 2
        }

        for (let i = 0; i < this.state.chosen.length; i++) {
            arr[this.state.chosen[i][0]][this.state.chosen[i][1]] = 3
        }

        var jsx = arr.map((val, index) => {
            return (
                <tr>
                    {
                        val.map((val1, i) => {
                            if (val1 === 2) {
                                return (
                                    <input 
                                        type='button' 
                                        value={arrAbjad[index] + (i + 1)}
                                        disabled
                                        style={{width: '45px', height: '45px', color: 'white', textAlign: 'center'}} 
                                        className='p-2 mr-2 mt-2 btn btn-danger' />
                                )
                            } else if(val1 === 3){
                                return (
                                    <input
                                        type='button'
                                        value={arrAbjad[index] + (i + 1)}
                                        style={{ width: '45px', height: '45px', color: 'white', textAlign: 'center' }}
                                        className='p-2 mr-2 mt-2 btn btn-success' 
                                        onClick={() => this.onCancelSeatClick([index, i])}
                                        />
                                )
                            }
                            return (
                                <input 
                                    type='button' 
                                    value={arrAbjad[index] + (i + 1)} 
                                    style={{ width: '45px', height: '45px', color: 'black', textAlign: 'center' }} 
                                    className='p-2 mr-2 mt-2 btn btn-outline-light' 
                                    onClick={() => this.onSeatClick([index, i])}
                                    />
                            )
                        })
                    }
                </tr>
            )
        })
        return jsx
    }

    render() {
        if (this.props.location.state === undefined || localStorage.getItem('Username') === null) {
            return (
                <Redirect to='/' />
            )
        }
        if(this.state.addToCartTicket === 'GoToCart') {
            return (
                <Redirect to={'/cart?userid=' + this.props.idUser} />
            )
        }
        return (
            <div className='container mt-3 mb-5 text-white orderSeat-container'>
                {this.purchaseTiketAlert(this.state.addToCartTicket)}
                {this.ChangeTitleWebsite(this.props.location.state.title)}
                    {
                        this.props.location.state.title !== '' ?
                        <h1>{this.props.location.state.title}</h1>
                        :
                        <Loader
                            type='ThreeDots'
                            color='#FFFFFF'
                            height='50'
                            width='50'
                        />
                    }
                    <h2 className='text-center'>Order Seat Here</h2>
                    <div className='row justify-content-center'>
                        <table>
                            {this.renderSeat()}
                        </table>
                    </div>
                    <div className='container mt-4 text-white'>
                        <h3>{Array(this.BookedSeat()).join('-')}</h3>
                        {this.selectedSeat(this.state.chosen)}
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        idUser: state.user.id,
        status: state.user.status,
        // transaction: state.user.transaction,
        cart: state.cart.cart,
        cartCount: state.cart.count
    }
}

export default connect(mapStateToProps, { AddToCart })(SeatRes)
