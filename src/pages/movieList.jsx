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
                <div className="col-md-3 mt-3">
                    <div className='mycard'>
                        <div className="durationbox rounded-circle text-center"><span className='durationtext'>{val.runtime.split(' ')[0]} minutes</span></div>
                        <img src={val.poster} alt={'Poster-'+val.id} className='img-fluid'/>
                        <div className="mycard_desc p-2">
                            <p>{val.title}</p>
                            <div className='genrebox rounded-pill text-center'><span>{val.genre}</span></div>
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