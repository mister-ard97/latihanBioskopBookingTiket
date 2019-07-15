import React from 'react';
// import Axios from 'axios';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

export class ModalMisterMovie extends React.Component {
    state = {
        showVideo: null,
        showDirectorPhoto: null
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.closeModal} className={this.props.className}>
                <ModalHeader toggle={this.props.closeModal}>
                    {this.props.ModalHeader}
                    </ModalHeader>
                <ModalBody>
                    {this.props.ModalBody}
                </ModalBody>
                <ModalFooter>
                    {this.props.ModalFooter}
                </ModalFooter>
            </Modal>
        )
    }
}