import React from 'react';
// Material UI
import {Table, TableBody, TableCell, TableFooter, TablePagination, TableRow, Paper, Container, TableHead} from '@material-ui/core';
import {DeleteForeverOutlined, Edit} from '@material-ui/icons';
// Reactstrap
import { ModalAddMovieAdmin, ModalEditMovieAdmin } from '../../components/modal';
import Axios from 'axios'


class ManageMovie extends React.Component {
    // state
    state = {
        data : [],
        modal: true,
        input: false,
        idSelected: null,
        selected: null
    }
    
    // lifecycle
    componentDidMount() {
        Axios.get('http://localhost:2000/movies')
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    // functions
    cutPlotStr = (param) => {
        if(param.length < 50 ) {       
            return param;
        } else {
            return param.substr(0, 50);
        }
    }

    morePlot = (param) => {
        if(param < 51) {
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
        if(param.length <= 1) {
            return param;
        } else {
            return param.join(', ');
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
                    <TableCell><DeleteForeverOutlined className='hoverAction' onClick={() => this.deleteData(val.id, index)}/></TableCell>
                    <TableCell><Edit className='hoverAction' onClick={() => this.setState({selected: index, idSelected: val.id, modal: true})}/></TableCell>
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

        let playingAt = [];
        for(let x = 0; x < 5; x++) {
            let radioButtons = document.getElementsByName('radio'+x)[0]
            if(radioButtons.checked === true) {
                playingAt.push(Number(radioButtons.value));
            }
        }

        if(
            title !== '' 
            && rated !== '' 
            && runtime !== '' 
            && genre !== '' 
            && plot !== '' 
            && director !== "" 
            && poster !== '' 
            && playingAt.length !== 0) 
            {
                Axios.post('http://localhost:2000/movies', {
                    title,
                    rated,
                    runtime,
                    genre,
                    plot,
                    playingAt,
                    director,
                    poster
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
    deleteData = (indexDB, index) => {
        let confirmDelete = window.confirm('Are Your Sure Want To Delete This Post?');
        if(confirmDelete) {
            Axios.delete('http://localhost:2000/movies/' + indexDB )
            .then((res) => {
                if(res.status === 200) {
                    let data = this.state.data;
                    data.splice(index, 1);
                    this.setState(data);
    
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    // end of delete function

    //function edit data
    editData = (index) => {
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
            && playingAt.length !== 0) 
            {
                Axios.patch(
                    'http://localhost:2000/movies/' + this.state.idSelected,
                    {
                        title,
                        rated,
                        runtime,
                        genre,
                        plot,
                        playingAt,
                        director,
                        poster
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
        this.setState({input: true, modal: true});
    }

    addModalMovieAdmin = (param) => {
        if(param) {
            return (
                <ModalAddMovieAdmin 
                    addData={this.addData} 
                    closeModal={this.closeModal} 
                    modal={this.state.modal}
                />
            )
        }
    }

    editModalMovieAdmin = (param) => {
        if (param !== null) {
            return (
                <ModalEditMovieAdmin 
                    editData={this.editData} 
                    closeModal={this.closeModal} 
                    modal={this.state.modal} 
                    index={this.state.selected} 
                    indexDb={this.state.idSelected} 
                    data={this.state.data}
                />
            )
        }
    }

    // Modal 
    closeModal = () => {
        this.setState({input: false, modal: false, selected: null, idSelected: null});
    }

    // render
    render () {
        return (
            <Container fixed>
                <h1>Ini Manage Movie</h1>
                <input 
                    type='button' 
                    className='btn btn-success mb-2' 
                    value='Add Data' 
                    onClick={() => this.showModalMovieAdmin()}
                />
                {this.addModalMovieAdmin(this.state.input)}
                {this.editModalMovieAdmin(this.state.selected)}
                <Paper>
                   <Table>
                        <TableHead>
                        <TableCell>No</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Sutradara</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell>Genre</TableCell>
                        <TableCell>Schedule</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Sinopsis</TableCell>
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