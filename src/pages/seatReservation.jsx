import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AddToCart } from './../redux/actions'
import Axios from 'axios';
import { Paper } from '@material-ui/core';
import Loader from 'react-loader-spinner';
import {Button} from 'reactstrap';
import { ModalMisterMovie } from '../components/modal'
import { UrlApi } from '../supports/UrlApi';


var numeral = require('numeral')

class SeatRes extends React.Component {
    state = {
        idUser: 0,
        titleMovies: '',
        chosen: [],
        temporarySeat: [],
        bookedSeat: [],
        modal: false,
        addToCartTicket: null,
        cart: []
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        document.body.style.backgroundImage = 'linear-gradient(to right, #c31432, #240b36)';
        if(this.props.cart !== 0) {
            let FindTitle = this.props.cart.find((val) => val.titleMovie === this.props.location.state.title)
            if(FindTitle !== undefined) {
                let bookedPosition = FindTitle.bookedPosition;
                this.setState({temporarySeat: bookedPosition})
            }
        }
        if (this.props.location.state.id !== undefined) {
            Axios.get(UrlApi + '/movies/' + this.props.location.state.id)
                .then((res) => {
                    this.setState({ bookedSeat: res.data.booked, idUser: this.props.idUser })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
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
        let price = this.state.chosen.length * 30000;
        let obj = {
            idMovie: idMovie,
            titleMovie: title,
            bookedSeat: this.BookedSeat(),
            bookedPosition: bookedSeatPosition,
            price: price,
            codeTransaction: '',
            userId: ''
        }
        
        if(this.state.chosen !== 0) { 

            this.setState({
                addToCartTicket: true, 
                temporarySeat: [...this.state.temporarySeat, ...this.state.chosen],
                chosen: [], 
                modal: true 
            })
        }
        this.props.AddToCart(obj);
    }

    purchaseTiketAlert = (param) => {
        if(param) {
            return (
                <ModalMisterMovie 
                    className='modal-md'
                    closeModal={this.toggle}
                    modal={this.state.modal}
                    ModalHeader='Added To Cart'
                    ModalBody={this.ModalBodySeatReservation()}
                    ModalFooter={this.ModalFooterSeatReservation()}
                />
            ) 
        }
    }

    ModalBodySeatReservation = () => {
        return (
            <div>
                Tiket Booking telah ditambahkan ke Cart. <br />
                Setelah di Cart harap melakukan Checkout agar bangku bisa ke booked oleh Anda.
                <hr />
                <p>Note: Data sementara berwarna kuning, Ketika sudah melakukan checkout maka bangku berwarna merah karena statusnya telah dibooking.<br/>
                Ketika page direfresh, maka data Cart akan kosong. Karena belum melakukan Checkout maka Booking Seat tidak tersimpan dalam database.</p>
            </div>
        )
    }

    ModalFooterSeatReservation = () => {
        return (
           <div>
                <Button color="success" onClick={() => this.setState({ addToCartTicket: 'GoToCart' })}>Go To Cart</Button>{' '}
                <Button color="danger" onClick={this.toggle}>Cancel</Button>
           </div>
        )
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

        for (let i = 0; i < this.state.temporarySeat.length; i++) {
            arr[this.state.temporarySeat[i][0]][this.state.temporarySeat[i][1]] = 4
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
                            } else if (val1 === 4) {
                                return (
                                    <input
                                        type='button'
                                        disabled
                                        value={arrAbjad[index] + (i + 1)}
                                        style={{ width: '45px', height: '45px', color: 'dark', textAlign: 'center' }}
                                        className='p-2 mr-2 mt-2 btn btn-warning'
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
        if (this.props.location.state === undefined || sessionStorage.getItem('Username') === null) {
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
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps, { AddToCart })(SeatRes)
