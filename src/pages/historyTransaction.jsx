import React from 'react';
import Axios from 'axios';
import { UrlApi } from '../supports/UrlApi';
import { Redirect } from 'react-router-dom';
import { Table, TableBody, TableCell, TableRow, Paper, Container, TableHead } from '@material-ui/core';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Loader from 'react-loader-spinner'; 

var numeral = require('numeral')

class HistoryTransaction extends React.Component {

    state = {
        idUser: 0,
        username: '',
        HistoryTransaction: null,
        totalBiaya: 0,
        selectedDetail: null,
        modal: false
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let username = sessionStorage.getItem('Username');
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
                    <TableCell>Rp. {val.map((val2, index) => {
                        if(index === val.length - 1) {
                            return numeral(val2.totalTransaction).format(0,0)
                        } 
                    })}</TableCell>
                    <TableCell>
                        <input type='button' className='btn btn-primary' value='Detail' onClick={() => this.setState({selectedDetail: [val], modal: true})}/>
                    </TableCell>
                </TableRow>
            )
        })
       return jsx;
    }

    ModalDetail = (param) => {
        if(param !== null) {
            return (
                <Modal isOpen={this.state.modal} toggle={this.toggle} className='modal-xl'>
                    <ModalHeader toggle={this.toggle}>History Detail</ModalHeader>
                    <ModalBody>
                        {param.map((val, index) => {
                            return (
                                <Table>
                                    <TableHead>
                                        <TableCell>No</TableCell>
                                        <TableCell>Judul Film</TableCell>
                                        <TableCell>Nomor Bangku</TableCell>
                                        <TableCell>Total Bangku</TableCell>
                                        <TableCell>Harga</TableCell>
                                    </TableHead>
                                    <TableBody>
                                    {val.map((val2, index) => {
                                            if (index === val.length - 1) {
                                                return null
                                            } else {
                                                return (
                                                        <TableRow>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{val2.titleMovie}</TableCell>
                                                        <TableCell>{val2.bookedSeat}</TableCell>
                                                        <TableCell className='text-center'>{val2.bookedPosition.length}</TableCell>
                                                        <TableCell>Rp. {numeral(val2.price).format(0,0)}</TableCell>
                                                        </TableRow>
                                                )
                                            }
                                        })}
                                 </TableBody>
                            </Table>
                            )
                        })}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            )
        }
    }

    toggle = () => {
        this.setState({ modal: false});
    }

    render() {
        if(sessionStorage.getItem('Username') === null ) {
            return (
                <Redirect to='/' />
            )
        }
        return (
            <div className='container'>
                <Paper className='p-5 my-5'>
                <h2>Ini Page History Purchase</h2>
                    {this.ModalDetail(this.state.selectedDetail)}
                    <Table className='my-5'>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Tanggal Transaksi</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Total Biaya Transaction</TableCell>
                            <TableCell>Detail Transaction</TableCell>
                        </TableHead>
                        <TableBody>
                            {   
                                this.state.HistoryTransaction === null ?
                                    <TableRow>
                                        <TableCell colSpan='6' className='text-center'>
                                            <Loader type='ThreeDots' color='black' width='40px' />
                                        </TableCell>
                                    </TableRow>
                                :
                                    this.state.HistoryTransaction.length === 0 ?
                                        <TableRow>
                                            <TableCell colSpan='6' className='text-center'>Data Transaksi Kosong.</TableCell>
                                        </TableRow>
                                    :
                                    this.renderTransaction()}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default HistoryTransaction;