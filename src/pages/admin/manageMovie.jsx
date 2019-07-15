import React from 'react';
// Material UI
//TableFooter, TablePagination,
import { Table, TableBody, TableCell, TableRow, Paper, Container, TableHead } from '@material-ui/core';
import { DeleteForeverOutlined, Edit } from '@material-ui/icons';
// Reactstrap
import { ModalMisterMovie } from '../../components/modal';
import Axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Form } from 'reactstrap';



class ManageMovie extends React.Component {
    // state
    state = {
        data: [],
        modal: true,
        input: false,
        idSelected: null,
        selected: null,
        DelSelected: null
    }

    // lifecycle
    componentDidMount() {
        document.title = 'Manage Movie'
        document.body.style.backgroundImage = 'linear-gradient(to right, #c31432, #240b36)';
        Axios.get('http://localhost:2000/movies')
            .then((res) => {
                this.setState({ data: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // functions
    cutPlotStr = (param) => {
        if (param.length < 50) {
            return param;
        } else {
            return param.substr(0, 50);
        }
    }

    morePlot = (param) => {
        if (param < 51) {
            return ''
        } else {
            return param.substr(51, param.length);
        }
    }

    showPlot = (id) => {
        console.log(id)
        let dots = document.getElementById('dots' + id);
        let more = document.getElementById('more' + id);
        let btnReadMore = document.getElementById('readMore' + id);

        if (dots.style.display === "none") {
            dots.style.display = "inline";
            btnReadMore.innerHTML = "Read more";
            more.style.display = "none";
        } else {
            dots.style.display = "none";
            btnReadMore.innerHTML = "Read less";
            more.style.display = "inline";
        }
    }

    playingAt = (param) => {
        if (param.length <= 1) {
            return param;
        } else {
            return param.join(', ');
        }
    }

    checkTrailer = (param) => {
        let youtubeLink = /youtube.com/g.test(param)
        if (param !== undefined && youtubeLink === true) {
            return 'Ada'
        } else {
            return 'Tidak Ada'
        }
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
    // end functions


    // function print, add, edit, delete

    // function printdatamovies.
    PrintDataMovies = () => {
        var jsx = this.state.data.map((val, index) => {
            return (
                <TableRow>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.director}</TableCell>
                    <TableCell>
                        <img src={val.poster} alt={'Poster-' + val.title.substr(0, 10)} style={{ width: '70px' }} />
                    </TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell>{this.playingAt(val.playingAt)}</TableCell>
                    <TableCell>{val.runtime} min</TableCell>
                    <TableCell>
                        <span id={'cut' + val.id}>{this.cutPlotStr(val.plot)}</span>
                        <span id={'dots' + val.id}>...</span>
                        <span id={'more' + val.id} style={{ display: 'none' }}>{this.morePlot(val.plot)}</span>
                        <p id={'readMore' + val.id} className='linkReadMore' onClick={() => this.showPlot(val.id)}>Read More</p>
                    </TableCell>
                    <TableCell>{this.checkTrailer(val.linkTrailer)}</TableCell>
                    <TableCell><DeleteForeverOutlined className='hoverAction' onClick={() => this.setState({ DelSelected: index, idSelected: val.id, modal: true })} /></TableCell>
                    <TableCell><Edit className='hoverAction' onClick={() => this.setState({ selected: index, idSelected: val.id, modal: true })} /></TableCell>
                </TableRow>
            )
        });

        return jsx;
    }
    // end function printdata movies

    // function addData
    addData = () => {
        // Get data yang ada di form
        // let title = document.getElementsByName('title')[0].value;
        let form = document.getElementById('addDataMovie').elements;
        let title = form[0].value;
        let rated = form[1].value;
        let runtime = Number(form[2].value);
        let genre = form[3].value;
        let plot = form[4].value;
        let director = form[10].value;
        let poster = form[11].value;
        let trailerMovie = form[12].value;
        let directorImage = form[13].value;

        let playingAt = [];
        for (let x = 0; x < 5; x++) {
            let radioButtons = document.getElementsByName('radio' + x)[0]
            if (radioButtons.checked === true) {
                playingAt.push(Number(radioButtons.value));
            }
        }

        if (
            title !== ''
            && rated !== ''
            && runtime !== ''
            && genre !== ''
            && plot !== ''
            && director !== ""
            && poster !== ''
            && playingAt.length !== 0
            && trailerMovie !== ''
            && directorImage) {
            Axios.post('http://localhost:2000/movies', {
                title,
                rated,
                runtime,
                genre,
                plot,
                playingAt,
                director,
                poster,
                linkTrailer: trailerMovie,
                directorImage,
                seats: 100,
                booked: []
            })
                .then((res) => {
                    alert('Add Data Success');
                    var addMovieData = this.state.data;
                    addMovieData.push(res.data);
                    this.setState({ data: addMovieData });
                })
                .catch((err) => {
                    console.log(err);
                })

            this.closeModal();
        } else {
            alert('Semua Data Harus Di isi');
        }


    }
    // end addData function

    // function delete
    // function delete menerima parameter (nomoridDatabase, nomoridArray di this.state.data)
    deleteData = (index, indexDB) => {
        Axios.delete('http://localhost:2000/movies/' + indexDB)
            .then((res) => {
                if (res.status === 200) {
                    let data = this.state.data;
                    data.splice(index, 1);
                    this.setState({data, modal: false});
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    // end of delete function

    //function edit data
    editData = (index, indexDB) => {
        // Get data yang ada di form
        // let title = document.getElementsByName('title')[0].value;
        let form = document.getElementById('editDataMovie').elements;
        let title = form[0].value;
        let rated = form[1].value;
        let runtime = Number(form[2].value);
        let genre = form[3].value;
        let plot = form[4].value;
        let director = form[10].value;
        let poster = form[11].value;
        let trailerMovie = form[12].value;
        let directorImage = form[13].value;

        let playingAt = [];
        for (let x = 0; x < 5; x++) {
            let radioButtons = document.getElementsByName('radio' + x)[0]
            if (radioButtons.checked === true) {
                playingAt.push(Number(radioButtons.value))
            }
        }

        if (
            title !== ''
            && rated !== ''
            && runtime !== ''
            && genre !== ''
            && plot !== ''
            && director !== ""
            && poster !== ''
            && playingAt.length !== 0
            && trailerMovie !== ''
            && directorImage) {
            Axios.patch(
                'http://localhost:2000/movies/' + indexDB,
                {
                    title,
                    rated,
                    runtime,
                    genre,
                    plot,
                    playingAt,
                    director,
                    poster,
                    linkTrailer: trailerMovie,
                    directorImage
                })
                .then((res) => {
                    alert('Data Berhasil Diubah');
                    let data = this.state.data;
                    data[index] = res.data;
                    this.setState({ data })
                })
                .catch((err) => {
                    console.log(err);
                })

            this.closeModal();
        } else {
            alert('Semua Data Harus Di isi');
        }


    }
    //end of editData function

    // Modal Add, Edit Movie 
    showModalMovieAdmin = () => {
        this.setState({ input: true, modal: true });
    }

    addModalMovieAdmin = (param) => {
        if (param) {
            return (
                <ModalMisterMovie
                    className=''
                    closeModal={this.closeModal}
                    modal={this.state.modal}
                    ModalHeader='Add Movie'
                    ModalBody={this.contentManageMovie()}
                    ModalFooter={this.btnModalManageAdmin()}
                />
            )
        }
    }

    editModalMovieAdmin = (param) => {
        if (param !== null) {
            return (
                <ModalMisterMovie
                    className=''
                    closeModal={this.closeModal}
                    modal={this.state.modal}
                    ModalHeader='Edit Movie'
                    ModalBody={this.contentManageMovie()}
                    ModalFooter={this.btnModalManageAdmin()}
                />
            )
        }
    }

    deleteMovieAdmin = (param) => {
        if(param !== null) {
           return (
               <ModalMisterMovie
                   className=''
                   closeModal={this.closeModal}
                   modal={this.state.modal}
                   ModalHeader='Hapus Movie'
                   ModalBody={this.contentManageMovie()}
                   ModalFooter={this.btnModalManageAdmin()}
               />
           )
        }
    }

    // Modal 
    btnModalManageAdmin = () => {
        if (this.state.selected !== null) {
            return (
                <div>
                    <input
                        type='button'
                        className='btn btn-danger mr-3'
                        value='Cancel'
                        onClick={() => this.closeModal()}
                    />
                    <input
                        type='button'
                        className='btn btn-success'
                        value='Update Data'
                        onClick={() => this.editData(this.state.selected, this.state.idSelected)}
                    />
                </div>
            )
        } else if(this.state.DelSelected !== null) {
            return (
                <div>
                    <input
                        type='button'
                        className='btn btn-danger mr-3'
                        value='Cancel'
                        onClick={() => this.closeModal()}
                    />
                    <input
                        type='button'
                        className='btn btn-success'
                        value='Save'
                        onClick={() => this.deleteData(this.state.DelSelected, this.state.idSelected)}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <input
                        type='button'
                        className='btn btn-danger mr-3'
                        value='Cancel'
                        onClick={() => this.closeModal()}
                    />
                    <input
                        type='button'
                        className='btn btn-success'
                        value='Save'
                        onClick={() => this.addData()}
                    />
                </div>
            )
        }
    }

    contentManageMovie = () => {
        if(this.state.selected !== null) {
            const title = this.state.data[this.state.selected].title;
            const rated = this.state.data[this.state.selected].rated;
            const runtime = this.state.data[this.state.selected].runtime;
            const genre = this.state.data[this.state.selected].genre;
            const plot = this.state.data[this.state.selected].plot;
            const playingAt = this.state.data[this.state.selected].playingAt.join(', ');
            const director = this.state.data[this.state.selected].director;
            const poster = this.state.data[this.state.selected].poster;
            const linkTrailer = this.state.data[this.state.selected].linkTrailer;
            const directorImage = this.state.data[this.state.selected].directorImage;

            return (
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
                        defaultValue={directorImage}
                        onChange={() => this.setState({ showDirectorPhoto: true })}
                    />
                </Form>
            )
        } else if(this.state.DelSelected !== null) {
           return (
               <p>Apakah anda ingin menghapus data ini?</p>
           )
        } else {
            return (
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
                        onChange={() => this.setState({ showDirectorPhoto: true })}
                    />
                </Form>
            )
        }
    }

    closeModal = () => {
        this.setState({ input: false, modal: false, selected: null, idSelected: null });
    }

    // render
    render() {
        if(sessionStorage.getItem('Username') === null) {
            return (
                <Redirect to='/' /> 
            )
        }
        return (
            <Container fixed className='bg-white text-dark py-4 rounded my-4'>
                <h1>Ini Manage Movie</h1>
                <input
                    type='button'
                    className='btn btn-success mb-2'
                    value='Add Data'
                    onClick={() => this.showModalMovieAdmin()}
                />
                {this.addModalMovieAdmin(this.state.input)}
                {this.editModalMovieAdmin(this.state.selected)}
                {this.deleteMovieAdmin(this.state.DelSelected)}
                <Paper>
                    <Table>
                        <TableHead>
                            <TableCell>No</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Sutradara</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Genre</TableCell>
                            <TableCell>Schedule (Jam)</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Sinopsis</TableCell>
                            <TableCell>Trailer</TableCell>
                            <TableCell colSpan={2} className='text-center'>Action</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.PrintDataMovies()}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        )
    }
}

export default ManageMovie