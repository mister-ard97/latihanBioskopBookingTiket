import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';
import Loader from 'react-loader-spinner';
import {Button} from 'reactstrap';
import { AddToCart } from './../redux/actions'
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
            document.title ='- Order Seat - ' + param;
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

    // renderNumberSeat = () => {
    //     let arrNumberSeat = []
    //     for (let i = 0; i < this.props.location.state.seats / (this.props.location.state.seats / 20); i++) {
    //         arrNumberSeat.push(i)
    //     }
    //     let jsx = arrNumberSeat.map((val) => {
    //         return (
    //             <span className='numberSeat font-weight-bold text-light'>{val + 1}</span>
    //         )
    //     })

    //     return jsx
    // }

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
                    <div className='seatAlpha'>
                        <span className='mr-3 font-weight-bold text-light'>{arrAbjad[index]} - </span>
                    </div>
                    {
                        val.map((val1, i) => {
                            if (val1 === 2) {
                                return (
                                    
                                    <FontAwesomeIcon icon={faCouch} size='2x' className='text-danger mx-1 cursorSeat iconSmall'/>
                                )
                            } else if(val1 === 3){
                                return (
                                    
                                    <FontAwesomeIcon icon={faCouch} size='2x' className='text-success mx-1 cursorSeat iconSmall' onClick={() => this.onCancelSeatClick([index, i])}/>
                                )
                            } else if (val1 === 4) {
                                return (
                                    
                                    <FontAwesomeIcon icon={faCouch} size='2x' className='text-warning mx-1 cursorSeat iconSmall' />
                                )
                            }
                            return (
                                
                                <FontAwesomeIcon icon={faCouch} size='2x' className='text-white mx-1 cursorSeat iconSmall' onClick={() => this.onSeatClick([index, i])}/>
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
                    <div className='row justify-content-center pt-5 pb-1'>
                        <table className='mb-3'>
                            {this.renderSeat()}
                        </table>
                    <div className='mt-5 text-dark' style={{
                        backgroundColor: 'white'
                        , width: '100%'
                        , height: '30px'
                        , border: '0.5px solid grey'
                        , textAlign: 'center',
                        fontWeight: 'bolder'
                    }}>
                        LAYAR BIOSKOP
                    </div>  
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
