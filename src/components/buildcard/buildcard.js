import './buildcard.css';
import logo from '../../assets/fiat.jpg';
import BuildCardModal from '../buildcardmodal/buildcardmodal';

import React from 'react';
//import ReactDOM from 'react-dom';
import Modal from 'react-modal';

//Modal.setAppElement('#yourAppElement');


function BuildCard() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <>
        <div className="buildcardcontainer" onClick={openModal}>
            <img src={logo} alt="" className="buildcardimage" />
            <div className="buildcardinfo">
                <h3 className="buildcardheader">Jack Mehoff's 1993 Fiat Multipa</h3>
                <div className="buildcardbody">
                    <div className="buildcardlist">
                        <ul>
                            <li>Engine: ---</li>
                            <li>HP: ---</li>
                            <li>Torque: ---</li>
                        </ul>
                    </div>
                    <div className="buildcarddesc">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo odio at sem pretium interdum. Quisque eleifend euismod viverra. Donec scelerisque metus eros, nec fermentum nunc tempor at. Duis ultrices risus nec mollis viverra. Donec et nibh commodo, viverra urna eget, luctus enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo odio at sem pretium interdum. Quisque eleifend euismod viverra. Donec scelerisque metus eros, nec fermentum nunc tempor at. Duis ultrices risus nec mollis viverra. Donec et nibh commodo, viverra urna eget viverra urna eget viverra urna eget viverra urna eget viverra urna eget viverra urna eget</p>
                    </div>
                </div>
            </div>
        </div>
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
    >
        <button onClick={closeModal}>close</button>
        <div><BuildCardModal /></div>
        
    </Modal>
    </>
    );
}

export default BuildCard;
