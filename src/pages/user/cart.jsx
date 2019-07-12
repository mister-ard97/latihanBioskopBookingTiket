import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
// action
import { DeleteCart, DeleteCartAll} from './../../redux/actions'
import { Table, TableBody, TableCell, TableRow, Paper, Container, TableHead } from '@material-ui/core';
import { DeleteForeverOutlined, Edit } from '@material-ui/icons';

var numeral = require('numeral')

class Cart extends React.Component {
    state = {
        idUser: 0,
        user: '',
        cart: [],
        totalBiaya: 0,
        CheckOutPage: false
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let username = localStorage.getItem('Username');
        if(username !== null) {
            username = JSON.parse(username);
            // //localStorage.setItem('CartUser', JSON.stringify(this.props.cart))
            // let cart = localStorage.getItem('CartUser');
            // if (cart !== null) {
            //     cart = JSON.parse(cart)
            // } else {
                //     this.setState({idUser: username.id, user: username.username})
                // }
            this.setState({ idUser: username.id, user: username.username, cart: this.props.cart})
        }
        console.log(this.props.cart)
    } 

    hitungBiaya = () => {
        let totalBiaya = 0;
        this.state.cart.findIndex((val) => { totalBiaya += val.price})
        return totalBiaya
    }

    renderCart = () => {
        let jsx = this.state.cart.map((val, index) => {
            return (
                <TableRow>
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
            // buat action type delete_cart dan delete_cart_all
            // delete cart = hapus 1 data
            // delete cart all = hapus semua data cart.
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
        if (localStorage.getItem('Username') === null) {
            return (
                <Redirect to='/' />
            )
        }
        if(this.state.CheckOutPage) {
            this.setState({cart : []})
            return (
                <Redirect to={'/checkout?userid=' + this.state.idUser} />
            )
        }
        return (
            <div className='my-5 container-fluid px-0 text-white'>
               {this.changeTitleWebsite()}
                <Paper className='p-5 bgRoot CartStyle'>
                    <h2>Cart Movies</h2>
                    <Table className='mb-3'>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Booked Seat</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.cart.length === 0 ?

                                    <TableRow>
                                        <TableCell colSpan='5' className='text-center'>Data Cart Kosong.</TableCell>
                                    </TableRow>
                                    :
                                    this.renderCart()
                            }
                        </TableBody>
                    </Table>
                    <h4 className='mb-3'>Total Biaya: Rp. {numeral(this.hitungBiaya()).format(0,0)}</h4>
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