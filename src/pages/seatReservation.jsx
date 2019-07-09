import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AddToCart } from './../redux/actions'
import Axios from 'axios';
import { Paper } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
var numeral = require('numeral')

class SeatRes extends Component {
    state = {
        data: [],
        titleMovies: '',
        seats: 100, 
        baris: 5, 
        booked: [[2, 4], [3, 5], [1, 2], [1, 3]],
        chosen: [],
        bookedSeat: [],
        modal: true,
        redirect: null
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.style.backgroundImage = 'linear-gradient(to right, #c31432, #240b36)';
        let id = this.props.location.search.split('=')[1];
        Axios.get('http://localhost:2000/movies/'+id)
        .then((res) => {
            this.setState({data: res.data, titleMovies: res.data.title});
        })
        .catch((err) => {
            console.log(err);
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
        let title = this.state.titleMovies;
        let price = this.state.chosen.length * 30000;
        let obj = {
            titleMovie: title,
            booked: this.BookedSeat(),
            price: price
        }
        this.props.AddToCart(obj);   
    }

    toggle = () => {
        this.setState({modal: false})
    }

    renderSeat = () => {
        let arr = [];
        let arrAbjad = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        for (let i = 0; i < this.state.baris; i++) {
            arr.push([])
            for (let j = 0; j < this.state.seats / this.state.baris; j++) {
                arr[i].push(true)
            }
        }

        for (let i = 0; i < this.state.booked.length; i++) {
            arr[this.state.booked[i][0]][this.state.booked[i][1]] = false
            arr[this.state.booked[i][0]][this.state.booked[i][1]] = 2
        }

        for (var i = 0; i < this.state.chosen.length; i++) {
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
                                        style={{width: '40px', height: '40px', color: 'white', textAlign: 'center'}} 
                                        className='mr-2 mt-2 bg-danger' />
                                )
                            } else if(val1 === 3){
                                return (
                                    <input
                                        type='button'
                                        value={arrAbjad[index] + (i + 1)}
                                        style={{ width: '40px', height: '40px', color: 'white', textAlign: 'center' }}
                                        className='mr-2 mt-2 bg-success' 
                                        onClick={() => this.onCancelSeatClick([index, i])}
                                        />
                                )
                            }
                            return (
                                <input 
                                    type='button' 
                                    value={arrAbjad[index] + (i + 1)} 
                                    style={{ width: '40px', height: '40px', color: 'black', textAlign: 'center' }} 
                                    className='mr-2 mt-2' 
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
        if (this.props.status === '' && localStorage.getItem('Username') === null) {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <div className='container mt-5 mb-5 text-white orderSeat-container'>
                {this.ChangeTitleWebsite(this.state.titleMovies)}
                    {
                        this.state.titleMovies !== '' ?
                        <h1>{this.state.titleMovies}</h1>
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
        status: state.user.status,
        cart: state.cart
    }
}

export default connect(mapStateToProps, { AddToCart })(SeatRes)
