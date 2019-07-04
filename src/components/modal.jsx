import React from 'react';
// import Axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter, Form } from 'reactstrap';

export class ModalAddMovieAdmin extends React.Component {
    
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
                            <input name='radio0' type="radio" value="9" /> <span> 09.00 </span> 
                            <input name='radio1' type="radio" value="14" /> <span> 14.00 </span>
                            <input name='radio2' type="radio" value="16" /> <span> 16.00 </span> 
                            <input name='radio3' type="radio" value="20" /> <span> 20.00 </span>
                            <input name='radio4' type="radio" value="22" /> <span> 22.00 </span>
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
    render() {
        const title = this.props.data[this.props.index].title;
        const rated = this.props.data[this.props.index].rated;
        const runtime = this.props.data[this.props.index].runtime;
        const genre = this.props.data[this.props.index].genre;
        const plot = this.props.data[this.props.index].plot;
        const playingAt = this.props.data[this.props.index].playingAt.join(', ');
        const director = this.props.data[this.props.index].director;
        const poster = this.props.data[this.props.index].poster;
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
                        <span>Min</span>
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
                            <span>Playing At : Data Sebelumnya = {playingAt}<br/></span>
                            <input name='radio0' type="radio" value="9" /> <span> 09.00 </span>
                            <input name='radio1' type="radio" value="14" /> <span> 14.00 </span>
                            <input name='radio2' type="radio" value="16" /> <span> 16.00 </span>
                            <input name='radio3' type="radio" value="20" /> <span> 20.00 </span>
                            <input name='radio4' type="radio" value="22" /> <span> 22.00 </span>
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