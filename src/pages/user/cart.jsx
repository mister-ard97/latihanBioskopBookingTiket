import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Table, TableBody, TableCell, TableRow, Paper, Container, TableHead } from '@material-ui/core';
import { DeleteForeverOutlined, Edit } from '@material-ui/icons';


var numeral = require('numeral')

class Cart extends React.Component {
    state = {
        idUser: 0,
        user: '',
        cart: [],
        totalBiaya: 0
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let username = localStorage.getItem('Username');
        if(username !== null) {
            username = JSON.parse(username);
            this.setState({idUser: username.idUser, user: username.username, cart: this.props.cart})
        }
        console.log(this.props.cart)
    } 

    hitungBiaya = (param) => {
        this.state.totalBiaya += param;
    }

    renderCart = () => {
        let jsx = this.state.cart.map((val, index) => {
            return (
                <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{val.titleMovie}</TableCell>
                    <TableCell>{val.bookedSeat}</TableCell>
                    <TableCell>Rp. {numeral(val.price).format(0,0)}</TableCell>
                    {this.hitungBiaya(val.price)}
                    <TableCell><DeleteForeverOutlined className='hoverAction' onClick={() => this.deleteData(index)} /></TableCell>
                </TableRow>
            )
        })
        return jsx;
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
        return (
            <div className='container-fluid px-0 text-white'>
               {this.changeTitleWebsite()}
                <Paper className='p-5'>
                    <h2>Cart Movies</h2>
                    <Table>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Booked Seat</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.renderCart()}
                        </TableBody>
                    </Table>
                    <h4>Total Biaya: Rp. {numeral(this.state.totalBiaya).format(0,0)}</h4>
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

export default connect(mapToStateProps)(Cart);