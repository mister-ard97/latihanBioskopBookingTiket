import React from 'react';
import Axios from 'axios';

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

    onPrintMovies= () => {
        // console.log(this.state.data)
        var jsx = this.state.data.map((val) => {
            return (
                <div className="col-sm-6 col-md-3 mt-4 d-flex justify-content-center justify-content-md-start">
                    <div className="card mycard">
                        <div className="durationbox rounded-circle text-center"><span>{val.runtime} min</span></div>
                        <img className="card-img-top" src={val.poster} alt={'Poster-'+val.id}/>
                            <div className="card-body">
                                <h5 className="card-title">{val.title}</h5>
                                <p className="card-text genrebox rounded-pill text-center">{val.genre}</p>
                                <a href={'/'} className="btn btn-danger bg-btn-movie">Movie Detail...</a>
                            </div>
                    </div>
                </div>
            );
        });
        return jsx;
    }

    render() {
        return (
            <div className='container'>
                <div className='row'>

                    {this.onPrintMovies()}
                
                </div>
            </div>
        );
    }
}

export default MovieList