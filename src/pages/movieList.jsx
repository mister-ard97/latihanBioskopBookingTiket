import React from 'react';
import Axios from 'axios';
// component
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { UrlApi } from './../supports/UrlApi'
import './../supports/style/style.css'

class MovieList extends React.Component {
    state = {
        data: [],
        NoResult: '',
        loadingData: true
    }

    componentDidMount() {
        this.getDataMovies();
    }

    renderMoviesList = () => {
        return (
            <div className='container-fluid p-0 bgRoot'>
                <div className='container py-4'>
                    {
                        this.state.loadingData === true ?
                            <div className='d-flex justify-content-center'>
                                    <Loader
                                        type='ThreeDots'
                                        color='#000000'
                                        height='25'
                                        width='25'
                                    />
                            </div>
                            :
                            <div className='d-flex justify-content-between mb-4'>
                                <h2 className='text-center'>List Movies</h2>
                                <div className='form-inline'>
                                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search Movie" ref='searchMovie' />
                                    <button className="btn btn-outline-danger my-2 my-sm-0" type="submit" onClick={() => this.SearchMovieByTitle()}>Search Movie</button>
                                </div>
                            </div>
                    }
                    <div className='row'>
                        {
                            this.state.loadingData === true ?
                                <div className="col-12 d-flex justify-content-center">
                                    <div className="mycard text-center">
                                        <Loader
                                            type='ThreeDots'
                                            color='#000000'
                                            height='25'
                                            width='25'
                                        />
                                    </div>
                                </div>
                                :

                                this.state.data.length === 0 ?
                                    <div className="col-12 text-center p-0">
                                        <div id="notfound">
                                            <div className="notfound">
                                                <div className="notfound-404">
                                                    <h1>-<span className='img-fluid' />-</h1>
                                                </div>
                                                <p className='my-5 text-dark'>{this.state.NoResult}</p>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    this.onPrintMovies()
                        }
                    </div>
                </div>
            </div>
        )
    }

    getDataMovies = () => {
        Axios.get( UrlApi +'/movies')
            .then((res) => {
                this.setState({data: res.data, loadingData: false})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    titleLink = (param) => {
        return param.replace(/ /g, '-');
    }

    onPrintMovies= () => {
        var jsx = this.state.data.map((val) => {
            return (
                <div className="col-sm-6 col-md-4 col-lg-3 mt-4 d-flex justify-content-center justify-content-md-start">
                    <div className="card mycard">
                        <div className="durationbox rounded-circle text-center"><span>{val.runtime} min</span></div>
                            <img className="card-img-top" src={val.poster} alt={'Poster-' + val.id} />
                            <div className="card-body">
                                <h5 className="card-title">{val.title}</h5>
                                <p className="card-text genrebox rounded-pill text-center">{val.genre}</p>
                                <Link to={'/movie-detail?id='+ val.id}>
                                    <button className="btn btn-danger bg-btn-movie">Movie Detail...</button>
                                </Link>
                            </div>
                    </div>
                </div>
            );
        });
        return jsx;
    }

    SearchMovieByTitle = () => {
        let searchByTitle = this.refs.searchMovie.value
        // playingAt_like=20,22 get= [20,22]
        Axios.get(UrlApi + '/movies?title_like=' + searchByTitle)
            .then((res) => {
                if(res.data.length === 0) {
                    this.refs.searchMovie.value = ''
                    this.setState({NoResult: 'Movie tidak ditemukan', loadingData: false, data: []})
                } else {
                    this.refs.searchMovie.value = ''
                    this.setState({data: res.data, loadingData: false})
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        if (localStorage.getItem('LogOut') === 'Success') {
            localStorage.removeItem('LogOut');
            return (
                <Redirect to='/' />
            )
        } else {
            return (
                this.renderMoviesList()
            );
        }
    }
}

export default MovieList;