import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// action
import { DeleteCart, DeleteCartAll} from './../../redux/actions'
import { Table, TableBody, TableCell, TableRow, Paper, TableHead } from '@material-ui/core';
import { DeleteForeverOutlined } from '@material-ui/icons';

var numeral = require('numeral')

class Cart extends React.Component {
    state = {
        idUser: 0,
        user: '',
        cart: [],
        totalBiaya: 0,
        CheckOutPage: false,
        BackToHome : false
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let username = localStorage.getItem('Username');
        if(username !== null) {
            username = JSON.parse(username);
            this.setState({ idUser: username.id, user: username.username, cart: this.props.cart})
        }
    } 

    hitungBiaya = () => {
        let totalBiaya = 0;
        // Foreach just loop in my array cart
        // FindIndex must return something
        this.state.cart.forEach((val) => {
            totalBiaya += val.price
        })
        //this.state.cart.findIndex((val) => totalBiaya += val.price)
        return totalBiaya
    }

    renderCart = () => {
        let jsx = this.state.cart.map((val, index) => {
            return (
                <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{val.titleMovie}</TableCell>
                    <TableCell>{val.bookedPosition.length} Seats</TableCell>
                    <TableCell>{val.bookedSeat}</TableCell>
                    <TableCell>Rp. {numeral(val.price).format(0,0)}</TableCell>
                    <TableCell><DeleteForeverOutlined className='hoverAction' onClick={() => this.deleteDataCart(index)} /></TableCell>
                </TableRow>
            )
        })
        return jsx;
    }

    deleteDataCart = (index) => {
        let confirmDelete = window.confirm('Are you sure want to delete this Cart?')
        if(confirmDelete) {
            let dataCart = this.state.cart;
            dataCart.splice(index, 1);
            this.props.DeleteCart(dataCart);
            this.setState({cart: dataCart})
        }
    }

    Checkout = () => {
        this.setState({CheckOutPage: true})
    }

    changeTitleWebsite = () => {
        document.title = this.state.user + `'s Cart`;
    }

    render() {
        if (localStorage.getItem('Username') === null || this.state.BackToHome === true) {
            return (
                <Redirect to='/' />
            )
        }
        if(this.state.CheckOutPage) {
            // Cannot update during an existing state transition (such as within `render`). 
            // Render methods should be a pure function of props and state.
            // when we want to update state.cart.length become 0, we can't use it in render.
            // we can use it in the next redirect, in this cart in checkout page
            return (
                <Redirect to={'/checkout?userid=' + this.state.idUser} />
            )
        }
        return (
            <div className='my-5 container-fluid px-0 text-white'>
               {this.changeTitleWebsite()}
                <Paper className='p-5 bgRoot'>
                    <h2>Cart Movies: {this.state.user}</h2>
                    <Table className='mb-3'>
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Qty</TableCell>
                                <TableCell>Booked Seat</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.cart.length === 0 ?

                                    <TableRow>
                                        <TableCell colSpan='6' className='text-center'>Data Cart Kosong.</TableCell>
                                    </TableRow>
                                    :
                                    this.renderCart()
                            }
                        </TableBody>
                    </Table>
                    <h4 className='mb-3'>Total Biaya: Rp. {numeral(this.hitungBiaya()).format(0,0)}</h4>
                    <input type="button" value='Lanjutkan Belanja' className='btn btn-warning mr-3' onClick={() => this.setState({BackToHome: true})} />
                    <input type="button" value='Checkout' className='btn btn-info' onClick={()=>this.Checkout()}/>
                </Paper>
            </div>
        )
    }
}

const mapToStateProps = (state) => {
    return {
        cart: state.cart.cart
    }
}

export default connect(mapToStateProps, {DeleteCart, DeleteCartAll})(Cart);