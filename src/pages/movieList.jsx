import React from 'react';
import Axios from 'axios';
// component
import { Link } from 'react-router-dom';

class MovieList extends React.Component {
    state = {
        data: []
    }

    componentDidMount() {
        this.getDataMovies();
    }

    getDataMovies = () => {
        Axios.get('http://localhost:2000/movies')
            .then((res) => {
                this.setState({data: res.data})
            })
            .catch((err) => {
                console.log(err)
            })
    }

    titleLink = (param) => {
        return param.replace(/ /g, '-');
    }

    onPrintMovies= () => {
        // console.log(this.state.data)
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

    render() {
        return (
            <div className='container-fluid p-0 bgRoot'>
                <div className='container py-4'>
                    <h2 className='text-center'>List Movies</h2>
                    <div className='row'>
                        {this.onPrintMovies()}
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieList;