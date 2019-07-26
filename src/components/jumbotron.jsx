import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'; 

class Jumbotron extends React.Component {

    componentDidMount() {
        window.scrollTo(0, 0);
        document.title = 'MisterMovie - Booking Tiket Nonton Secara Online - JC9';
    }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid Custnavbar py-5">
                <div className="container-fluid px-5 py-5">
                   <div className="row px-3">
                        <div className="col-md-9 pt-5 pb-5 pb-lg-0 mb-5">
                            {
                                this.props.user.status === 'Register' ?
                                    <div class="alert alert-info" role="alert">
                                        Selamat Bergabung user {this.props.user.username}.
                                    </div>
                                    : null
                            }
                            {
                                this.props.user.status === 'Login' ?
                                    <div class="alert alert-info" role="alert">
                                        Selamat Datang Kembali {this.props.user.username}.
                                    </div> : null
                            }
                            <h1 className="display-4">MisterMovie</h1>
                            {
                                    this.props.user.username === '' ?

                                    <div>
                                        <p className="lead">Dengan mendaftar di MisterMovie, Kalian dapat booking tiket nonton yang kalian inginkan.</p>
                                        <p>BURUAN DAFTAR SEKARANG!</p>
                                        <Link to='/register'>
                                            <button className='registerNowBtn btn btn-danger'>REGISTER NOW</button>
                                        </Link>
                                    </div>
                                    :
                                    null

                            }
                            {
                               this.props.user.username !== '' ?
                                    <div>
                                        <p className="lead">Bagi Kalian yang sudah bergabung, dapat melakukan 'Buy Ticket' pada Movie yang kalian ingin tonton</p>
                                        <p>Cek Movie yang kalian ingin tonton di List Movies Yah !!!</p>
                                    </div>
                               :
                                    null

                            }
                       </div>
                       <div className="d-none d-lg-block col-md-3 pr-5">
                            <Carousel 
                                showThumbs={false} 
                                showStatus={false}
                                showIndicators={false}
                                autoPlay interval={2000} 
                                infiniteLoop
                                style={{width: '85%'}} >
                                <div>
                                    <img 
                                        src="http://cdn.collider.com/wp-content/uploads/2019/05/spider-man-far-from-home-poster-fury-mysterio-2.jpg"
                                        alt="poster-spiderman"
                                        className='img-fluid'
                                    />
                                </div>
                                <div>
                                    <img 
                                        src="https://upload.wikimedia.org/wikipedia/id/c/ca/ToyStory4TheatricalReleasePoster.jpeg" 
                                        alt="poster-toy-story-4"
                                        className='img-fluid'
                                    />
                                </div>
                                <div>
                                    <img
                                        src="https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_SY1000_CR0,0,648,1000_AL_.jpg"
                                        alt="poster-toy-story-4"
                                        className='img-fluid'
                                    />
                                </div>
                            </Carousel>
                       </div>
                   </div>
                </div>
            </div>
        )
    }
} 

const mapToStateProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapToStateProps)(Jumbotron);