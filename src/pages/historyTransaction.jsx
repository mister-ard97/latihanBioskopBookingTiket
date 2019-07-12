import React from 'react';
import Axios from 'axios';
import { UrlApi } from '../supports/UrlApi';
import { Redirect } from 'react-router-dom';
import { Table, TableBody, TableCell, TableRow, Paper, Container, TableHead } from '@material-ui/core';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

var numeral = require('numeral')

class HistoryTransaction extends React.Component {

    state = {
        idUser: 0,
        username: '',
        HistoryTransaction: [],
        totalBiaya: 0,
        selectedDetail: null
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let username = localStorage.getItem('Username');
        if (username !== null) {
            username = JSON.parse(username);
            this.setState({ idUser: username.id, username: username.username})
            Axios.get(UrlApi + '/users/' + username.id)
                .then((res) => {
                    this.setState({HistoryTransaction: res.data.transaction})
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    renderTransaction = () => {
        let dataMovie = this.state.HistoryTransaction 
        var jsx = dataMovie.map((val, index) => {
            return (
                <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{val.map((val2) => { return val2.transactionTime })}</TableCell>
                    <TableCell>{val.length - 1}</TableCell>
                    <TableCell>Rp. {val.map((val2) => { return val2.totalTransaction})}</TableCell>
                    <TableCell>
                        <input type='button' className='btn btn-primary' value='Detail' onClick={() => this.setState({selectedDetail: index})}/>
                    </TableCell>
                </TableRow>
            )
        })
       return jsx;
    }

    render() {
        if(localStorage.getItem('Username') === null ) {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <div className='container'>
                <p>Ini Page History Purchase</p>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Tanggal Transaksi</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Total Biaya Transaction</TableCell>
                            <TableCell>Detail Transaction</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.renderTransaction()}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default HistoryTransaction;