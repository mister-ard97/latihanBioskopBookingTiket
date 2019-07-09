import React from 'react';
// import Axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter, Form } from 'reactstrap';

export class ModalAddMovieAdmin extends React.Component {
    state = {
        showVideo: null,
        showDirectorPhoto: null
    }

    showFrameTrailer = (param) => {
        if (param) {
            let linkVideo = document.getElementById('linkMovie').value;
            let youtubeLink = /youtube.com/g.test(linkVideo);
            if (youtubeLink === false) {
                return (
                    <div>
                        <p>Link Harus Link Trailer dari Youtube</p>
                        <p>(example : https://www.youtube.com/watch?v=1nVRj7Jr0G0)</p>
                    </div>
                )
            } else {
                linkVideo = linkVideo.split('=')[1];
                return (
                    <div className="embed-responsive embed-responsive-1by1">
                        <iframe title='trailer-movie' className="embed-responsive-item" src={'https://www.youtube.com/embed/' + linkVideo} allowfullscreen></iframe>
                    </div>
                )
            }
        }
    }

    showDirectorPhoto = (param) => {
        if (param) {
            let linkImage = document.getElementById('linkDirectorImage').value;
            if (linkImage === '') {
                return (
                    <div className='my-3'>
                        <p>Link Foto Sutradara Kosong.</p>
                    </div>
                )
            } else {
                return (
                    <div className='my-3'>
                        <img
                            src={linkImage}
                            alt="director-movie"
                            style={{ width: '200px' }}
                        />
                    </div>
                )
            }
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.closeModal}>
                <ModalHeader>
                    Add Movie
                    </ModalHeader>
                <ModalBody>
                    <Form id='addDataMovie'>
                        Title :
                        <input
                            type='text'
                            name='title'
                            className='form-control'
                            placeholder='Title'
                        />
                        Rated :
                        <input
                            type='text'
                            name='rated'
                            className='form-control'
                            placeholder='Rated'
                        />
                        Runtime :
                        <input
                            type='number'
                            name='runtime'
                            className='form-control'
                            placeholder='Runtime (minutes)'
                        />
                        Genre :
                        <input
                            type='text'
                            name='genre'
                            className='form-control'
                            placeholder='Genre'
                        />
                        Plot :
                        <textarea placeholder='Plot Film' class="form-control" rows="3"></textarea>
                        <div className='my-2'>
                            <span>Playing At : </span>
                            <input name='radio0' type="radio" value="9" /> <span> 09:00 </span>
                            <input name='radio1' type="radio" value="14" /> <span> 14:00 </span>
                            <input name='radio2' type="radio" value="16" /> <span> 16:00 </span>
                            <input name='radio3' type="radio" value="20" /> <span> 20:00 </span>
                            <input name='radio4' type="radio" value="22" /> <span> 22:00 </span>
                        </div>
                        Sutradara :
                        <input
                            type='text'
                            name='sutradara'
                            className='form-control'
                            placeholder='Sutradara'
                        />
                        Image :
                        <input
                            type='text'
                            name='image'
                            className='form-control'
                            placeholder='Image'
                        />
                        Trailer :
                        {this.showFrameTrailer(this.state.showVideo)}
                        <input
                            type='text'
                            name='movie'
                            id='linkMovie'
                            className='form-control my-3'
                            placeholder='Link Trailer (example : https://www.youtube.com/watch?v=1nVRj7Jr0G0)'
                            onChange={() => this.setState({ showVideo: true })}
                        />
                        Foto Sutradara :
                        {this.showDirectorPhoto(this.state.showDirectorPhoto)}
                        <input
                            type='text'
                            name='director-movie'
                            id='linkDirectorImage'
                            className='form-control'
                            placeholder='Foto Sutradara'
                            onChange={() => this.setState({ showDirectorPhoto: true})}
                        />
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <input
                        type='button'
                        className='btn btn-danger'
                        value='Cancel'
                        onClick={() => this.props.closeModal()}
                    />
                    <input
                        type='button'
                        className='btn btn-success'
                        value='Save'
                        onClick={() => this.props.addData()}
                    />
                </ModalFooter>
            </Modal>
        )
    }
}

export class ModalEditMovieAdmin extends React.Component {

    state = {
        showVideo: null,
        showDirectorPhoto: null
    }

    showFrameTrailer = (condition) => {
        if(condition) {
            let linkTrailer = document.getElementById('linkMovie').defaultValue;
            console.log(linkTrailer)
            let youtubeLink = /youtube.com/g.test(linkTrailer);
            if (youtubeLink === false) {
                return (
                    <div>
                        <p>Link Harus Link Trailer dari Youtube</p>
                        <p>(example : https://www.youtube.com/watch?v=1nVRj7Jr0G0)</p>
                    </div>
                )
            } else {
                linkTrailer = linkTrailer.split('=')[1];
                return (
                    <div className="embed-responsive embed-responsive-1by1">
                        <iframe title='trailer-movie' className="embed-responsive-item" src={'https://www.youtube.com/embed/' + linkTrailer} allowfullscreen></iframe>
                    </div>
                )
            }
        }
    }

    showDirectorPhoto = (param) => {
        if (param) {
            let linkImage = document.getElementById('linkDirectorImage').value;
            if (linkImage === '') {
                return (
                    <div className='my-3'>
                        <p>Link Foto Sutradara Kosong.</p>
                    </div>
                )
            } else {
                return (
                    <div className='my-3'>
                        <img
                            src={linkImage}
                            alt="director-movie"
                            style={{ width: '200px' }}
                        />
                    </div>
                )
            }
        }
    }

    render() {
        const title = this.props.data[this.props.index].title;
        const rated = this.props.data[this.props.index].rated;
        const runtime = this.props.data[this.props.index].runtime;
        const genre = this.props.data[this.props.index].genre;
        const plot = this.props.data[this.props.index].plot;
        const playingAt = this.props.data[this.props.index].playingAt.join(', ');
        const director = this.props.data[this.props.index].director;
        const poster = this.props.data[this.props.index].poster;
        const linkTrailer = this.props.data[this.props.index].linkTrailer;
        const directorImage = this.props.data[this.props.index].directorImage;
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.closeModal}>
                <ModalHeader>
                    Edit Movie
                    </ModalHeader>
                <ModalBody>
                    <Form id='editDataMovie'>
                        Title :
                        <input
                            type='text'
                            name='title'
                            className='form-control'
                            placeholder='Title'
                            defaultValue={title}
                        />
                        Rated :
                        <input
                            type='text'
                            name='rated'
                            className='form-control'
                            placeholder='Rated'
                            defaultValue={rated}
                        />
                        Runtime :
                        <input
                            type='number'
                            className='form-control'
                            placeholder='Runtime (minutes)'
                            defaultValue={runtime}
                        />
                        Genre :
                        <input
                            type='text'
                            name='genre'
                            className='form-control'
                            placeholder='Genre'
                            defaultValue={genre}
                        />
                        Plot :
                        <textarea class="form-control" rows="3" defaultValue={plot}></textarea>
                        <div className='my-2'>
                            <span>Playing At : Data Sebelumnya = {playingAt}<br /></span>
                            <input name='radio0' type="radio" value="9" /> <span> 09:00 </span>
                            <input name='radio1' type="radio" value="14" /> <span> 14:00 </span>
                            <input name='radio2' type="radio" value="16" /> <span> 16:00 </span>
                            <input name='radio3' type="radio" value="20" /> <span> 20:00 </span>
                            <input name='radio4' type="radio" value="22" /> <span> 22:00 </span>
                        </div>
                        Sutradara :
                        <input
                            type='text'
                            name='sutradara'
                            className='form-control'
                            placeholder='Sutradara'
                            defaultValue={director}
                        />
                        Image :
                        <input
                            type='text'
                            name='image'
                            className='form-control'
                            placeholder='Image'
                            defaultValue={poster}
                        />
                        Trailer :
                        {this.showFrameTrailer(this.state.showVideo)}
                        <input
                            type='text'
                            name='movie'
                            id='linkMovie'
                            className='form-control my-3'
                            placeholder='Link Trailer (example : https://www.youtube.com/watch?v=1nVRj7Jr0G0)'
                            defaultValue={linkTrailer}
                            onChange={() => this.setState({showVideo : true})}
                        />
                        Foto Sutradara :
                        {this.showDirectorPhoto(this.state.showDirectorPhoto)}
                        <input
                            type='text'
                            name='director-movie'
                            id='linkDirectorImage'
                            className='form-control'
                            placeholder='Foto Sutradara'
                            defaultValue={directorImage}
                            onChange={() => this.setState({ showDirectorPhoto: true })}
                        />
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <input
                        type='button'
                        className='btn btn-danger'
                        value='Cancel'
                        onClick={() => this.props.closeModal()}
                    />
                    <input
                        type='button'
                        className='btn btn-success'
                        value='Update Data'
                        onClick={() => this.props.editData(this.props.index)}
                    />
                </ModalFooter>
            </Modal>
        )
    }
}