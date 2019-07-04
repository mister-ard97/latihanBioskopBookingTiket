import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class MovieDetail extends React.Component {
    state = {
        data : [],
        login: null
    }
    componentDidMount() {
        // let title = this.props.location.search.split('=')[1].replace(/[-]/g, ' ');
        let id = this.props.location.search.split('=')[1];
        Axios.get('http://localhost:2000/movies/'+id)
        .then((res) => {
            this.setState({data: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    playingAtSplit = (param) => {
        param = param.join('').split(',');
        var array = [];
        for(let x = 0; x < param.length; x++) {
            if(x === 0) {
                array.push('Jam 0' + param[x] + ':00');
            } else {
                array.push('Jam ' + param[x] + ':00');
            }
        }
        return array.join(', ')
    }

    btnBuyTicket = () => {
        if(this.props.user.id === 0) {
            this.setState({login: false})
        }
    }

    render() {
        if(this.state.login === false) {
            return <Redirect to='/login' />
        }
        if(this.state.data === null) {
            return (
                <div>
                    <p>Loading</p>
                </div>
            )
        }
        return (
            <div className='container mt-4'>
                <div className="row">
                    <div className="col-md-4">
                        <img src={this.state.data.poster} alt="" className='img-fluid'/>
                    </div>
                    <div className="col-md-8">
                        <h1>{this.state.data.title}</h1>
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe 
                                title='trailer' 
                                className="embed-responsive-item" 
                                src="https://www.youtube.com/embed/wmiIUN-7qhEi"
                                frameBorder={0}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                        </div>
                        <p>{this.state.data.genre}</p>
                        <h5>{this.state.data.runtime} minutes</h5>
                        <p>{this.state.data.director}</p>
                        <p>Playing At: {this.playingAtSplit(Array(this.state.data.playingAt))}</p>
                        <p className='font-italic'>{this.state.data.plot}</p>
                        <input type="button" className='btn btn-outline-success' value='Buy Ticket' onClick={this.btnBuyTicket}/>
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

export default connect(mapToStateProps)(MovieDetail)