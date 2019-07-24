import React from 'react';
import Axios from 'axios';
import { UrlApi } from '../supports/UrlApi';
import { Redirect } from 'react-router-dom';
import { Table, TableBody, TableCell, TableRow, Paper, TableHead } from '@material-ui/core';
import { Button } from 'reactstrap';
import { ModalMisterMovie } from '../components/modal'
import Loader from 'react-loader-spinner'; 

var numeral = require('numeral')

class HistoryTransaction extends React.Component {

    state = {
        idUser: 0,
        username: '',
        HistoryTransaction: null,
        selectedDetail: null,
        purchaseDetail: null,
        modal: false
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let username = sessionStorage.getItem('Username');
        if (username !== null) {
            username = JSON.parse(username);
            this.setState({ idUser: username.id, username: username.username})
            Axios.get(UrlApi + '/transaction?userId=' + username.id)
                .then((res) => {
                    this.setState({HistoryTransaction: res.data})
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
                    <TableCell>{val.codeTransaction}</TableCell>
                    <TableCell>{val.transactionTime }</TableCell>
                    <TableCell>{val.totalSeats}</TableCell>
                    <TableCell>Rp. {numeral(val.totalTransaction).format(0,0)}</TableCell>
                    <TableCell>
                        <input type='button' className='btn btn-primary' value='Detail' onClick={() => this.getPurchaseDetail(val.codeTransaction)}/>
                    </TableCell>
                </TableRow>
            )
        })
       return jsx;
    }

    getPurchaseDetail = (param) => {
        Axios.get(UrlApi + '/transactionDetail?codeTransaction=' + param)
            .then((res) => {
                 this.setState({ purchaseDetail: [res.data], modal: true});
            })
            .catch((err) => {
                console.log(err)
            })
    }

    ModalDetail = (param) => {
        if(param) {
            return (
                <ModalMisterMovie
                    className='modal-xl'
                    closeModal={this.toggle}
                    modal={this.state.modal}
                    ModalHeader='History Detail'
                    ModalBody={this.contentModal()}
                    ModalFooter={<Button color="danger" onClick={this.toggle}>Close</Button>}
                />
            )
        }
    }

    contentModal = () => {
        let jsx = this.state.purchaseDetail.map((val) => {
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
                        {
                            val.map((valDetail, index) => {
                                return (
                                    <TableRow>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{valDetail.titleMovie}</TableCell>
                                        <TableCell>{valDetail.bookedSeat}</TableCell>
                                        <TableCell className='text-center'>{valDetail.bookedPosition.length}</TableCell>
                                        <TableCell>Rp. {numeral(valDetail.price).format(0, 0)}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            )
        })

        return jsx;
    }

    toggle = () => {
        this.setState({ modal: false, 
            selectedDetail: null,
            purchaseDetail: null
        });
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
                    {this.ModalDetail(this.state.modal)}
                <h2>History Purchase</h2>
                    <Table className='my-5'>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Code Transaction</TableCell>
                            <TableCell>Tanggal Transaction</TableCell>
                            <TableCell>Seats</TableCell>
                            <TableCell>Total Price Transaction</TableCell>
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
                                    this.renderTransaction()
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}

export default HistoryTransaction;