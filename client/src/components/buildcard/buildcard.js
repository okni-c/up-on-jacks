import './buildcard.css';

import ModalSlideshow from '../modalSlideshow/modalSlideshow';
import close from '../../assets/closebutton.png';

import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';



// Modal.setAppElement('#modal');


function BuildCard({ builds }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState(' ');


    return (
        <>{builds && builds.map(build => (
            <div key={build._id} className="buildcardcontainer" onClick={() => {
                    setModalIsOpen(true);
                    setModalData(build);
                }}>
                    <img src={build.img} alt="Build Car" className="buildcardimage" />
                    <div className="buildcardinfo">
                        <h3 className="buildcardheader">{build.username}'s {build.year} {build.manufacturer} {build.model}</h3>
                        <div className="buildcardbody">
                            {/* <div className="buildcardlist">
                                <ul>
                                    <li>Engine: </li>
                                    <li>HP: </li>
                                    <li>Torque: </li>
                                </ul>
                            </div> */}
                            <div className="buildcarddesc">
                                <p>{build.buildDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>))}
            <Modal
                isOpen={modalIsOpen}
                closeTimeoutMS={200}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Example Modal"
                className="Modal"
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <button onClick={() => setModalIsOpen(false)}><img src={close} alt="Close Button" /></button>
                <h3><Link to='/userprofile' onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}>{modalData.username}'s {modalData.year} {modalData.manufacturer} {modalData.model}</Link></h3>
                <ModalSlideshow />
                <h3>Biography</h3>
                <p className='modalDesc'>{modalData.buildDescription}</p>
                {/*<h3</h3>
                 <ul>
                    {Array.isArray(modalData.mods)
                        ? modalData.mods.map((mod, index) => {
                            return <li key={index}>{mod}</li>
                        })
                        :null}
                </ul> */}
            </Modal>
        </>
    );
}

export default BuildCard;
