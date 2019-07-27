import React from 'react';
import Axios from 'axios';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { ModalMisterMovie } from '../components/modal';
import { Button } from 'reactstrap';

class MovieDetail extends React.Component {
    state = {
        data : [],
        linkTrailer: '',
        titleMovies: '',
        login: null,
        modalTrailer: null,
        modalAlertLogin: null,
        notFoundMovies: null
    }
    
    componentDidMount() {
        let id = this.props.location.search.split('=')[1];
        window.scrollTo(0, 0);
        document.body.style.backgroundImage = 'linear-gradient(to right, #c31432, #240b36)'
        Axios.get('http://localhost:2000/movies/'+id)
        .then((res) => {
            this.setState({data: res.data, linkTrailer: res.data.linkTrailer, titleMovies: res.data.title});
        })
        .catch((err) => {
            console.log(err);
            this.setState({notFoundMovies: 'Error 404'})
        })
    }

    changeTitleWebsite = (param) => {
        if(param === '') {
            document.title = 'Loading...';
        } else {
            document.title = param + ' - Detail Movie -';
        }
    }

    playingAtSplit = (param) => {
        param = param.join('').split(',');
        var array = [];
        for(let x = 0; x < param.length; x++) {
            if(x === 0 && param[x] < 10) {
                array.push('Jam 0' + param[x] + ':00');
            } else {
                array.push('Jam ' + param[x] + ':00');
            }
        }
        return array.join(', ')
    }

    btnBuyTicket = () => {
        if(this.props.user.id === 0) {
            this.setState({ login: false, modalAlertLogin: true })
        } else {
            this.setState({ login: true, modalAlertLogin: false})
        }
    }

    alertBuyTicket = (param) => {
        if(param) {
            return (
                <Redirect to={{
                  pathname: 'order-seat',
                  state: this.state.data
                }}/>
            )
        } else {
            return (
                <ModalMisterMovie
                    className='modal-md'
                    closeModal={this.toggle}
                    modal={this.state.modalAlertLogin}
                    ModalHeader='Login Required'
                    ModalBody={this.contentModalAlert()}
                    ModalFooter={this.btnModal()}
                />
            )
        }
    }

    linkTrailer = (param) => {
        let link = param;
        link = link.split('=')[1]
        return link;
    }

    toggle = () => {
        this.setState({modalTrailer: false, modalAlertLogin: false});
    }

    showModalTrailer = () => {
        return (
            <ModalMisterMovie 
                className='modal-lg'
                closeModal={this.toggle}
                modal={this.state.modalTrailer}
                ModalHeader='Trailer Movie'
                ModalBody={this.contentModalTrailer()}
                ModalFooter={this.btnModal()}
            />
        )
    }
    // ModalBody dan ModalFooter
    contentModalTrailer = () => {
        if(this.state.modalTrailer) {
            return (
                 <div className="embed-responsive embed-responsive-16by9">
                    <iframe title='trailer-movie' class="embed-responsive-item" src={'https://www.youtube.com/embed/' + this.linkTrailer(this.state.linkTrailer)} allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
                </div>
            )
        }
    }

    contentModalAlert = () => {
       if (this.state.modalAlertLogin) {
            return (
                <div>
                    Silahkan Login Terlebih Dahulu Untuk Dapat Melakukan Pembelian Ticket Nonton.
                    <Link to='/login'>
                        <p className='LinkLoginBtn'>Klik Disini untuk Login</p>
                    </Link>
                </div>
            )
        }
    }

    btnModal = () => {
        if (this.state.modalTrailer !== false) {
            return (
                <Button color="danger" onClick={this.toggle}>Close</Button>
            )
        } else if (this.state.modalAlertLogin !== false) {
            return (
                <Button color="secondary" onClick={this.toggle}>Ok</Button>
            )
        }
    }
    // End ModalBody dan ModalFooter

    render() {
        if (this.state.notFoundMovies === 'Error 404') {
            return (
                <Redirect to='/404'/>
            )
        }
        if(this.state.data.length >= 0) {
            return (
                <div className='container-fluid text-white'>
                    <div className='row justify-content-center'>
                        <Loader 
                            type='ThreeDots'
                            color='#FFFFFF'
                            height='50'
                            width='50'
                        />
                    </div>
                </div>
            )
        }
        if (localStorage.getItem('LogOut') === 'Success') {
            localStorage.removeItem('LogOut');
            return (
                <Redirect to='/' />
            )
        } else {
            return (
                <div className='container-fluid mt-2 mb-5 text-white'>
                    {this.changeTitleWebsite(this.state.titleMovies)}
                    <div className="row px-5 pb-4">
                        <div className="col-md-3 mt-4 mr-md-5 mr-0 text-center text-md-left">
                            <p className='font-weight-bold'>OFFICIAL POSTER</p>
                            <img src={this.state.data.poster} alt="poster-movies" className='img-fluid' />
                        </div>
                        <div className="col-md-8 mt-3">
                            <h1>{this.state.data.title}</h1>
                            <p className='font-weight-bold'>{this.state.data.genre}</p>
                            <div className='d-flex justify-content-start text-dark mb-3'>
                                <div className='card text-center mr-4' style={{ width: '5rem', backgroundImage: 'linear-gradient(to bottom, #FFB75E, #ED8F03)' }}>
                                    <h5>{this.state.data.runtime} minutes</h5>
                                </div>
                                <div className='card text-center' style={{ width: '5rem', backgroundImage: 'linear-gradient(to bottom, #FFB75E, #ED8F03)' }}>
                                    <span>RATED</span>
                                    <h5>{this.state.data.rated}</h5>
                                </div>
                            </div>
                            <img
                                src={this.state.data.directorImage}
                                alt="director-movies"
                                className='rounded-circle ml-3'
                                style={{ width: '50px' }}
                            />
                            <p>{this.state.data.director}</p>
                            <div className='iconTrailer' onClick={() => this.setState({ modalTrailer: true })} style={{ width: '120px' }}>
                                <FontAwesomeIcon icon={faPlayCircle} size='md' className='mr-1' />
                                <span>Watch Trailer</span>
                            </div>
                            {this.showModalTrailer()}
                            <p className='font-weight-bold mt-3'>
                                <span className='font-weight-normal'>Playing At: </span><br />
                                {this.playingAtSplit(Array(this.state.data.playingAt))}
                            </p>
                            <p className='font-italic'>{this.state.data.plot}</p>
                            <input type="button" className='btn btn-outline-success' value='Buy Ticket' onClick={this.btnBuyTicket} />
                            {this.alertBuyTicket(this.state.login)}
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

const mapToStateProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapToStateProps)(MovieDetail)