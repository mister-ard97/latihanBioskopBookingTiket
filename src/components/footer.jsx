import React from 'react';

class Footer extends React.Component {
    
    render() {
        return (
            <div className='bg-dark'>
                <div className='container-fluid'>
                    <div className="row text-muted">
                        <div className="col-12 text-center py-4 font-italic mt-3">
                            <p>- Created By Muhammad Reza Ardiansyah -</p>
                            <p><a href="https://github.com/mister-ard97/latihanBioskopBookingTiketAPI">Link untuk API.JSON</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer