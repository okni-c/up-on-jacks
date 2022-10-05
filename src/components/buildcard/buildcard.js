import './buildcard.css';
import logo from '../../assets/fiat.jpg';
import ModalSlideshow from '../modalSlideshow/modalSlideshow';
import close from '../../assets/closebutton.png';

import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';



// Modal.setAppElement('#modal');


function BuildCard() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState(' ');

    const backendBuildData = [
        { car: "1986 Toyota AE86", owner: "John Daily", description: "Milk, Soup, Bread", engine: "4AGE", hp: "120", tq: "112", mods: ["coilovers", "exhaust"] },
        { car: "1996 Nissan R32 GTR", owner: "Reed Cass", description: "I spent a lot of time fucking off, time go to ape shit mode with RB20 turbo power baby.", engine: "RB20DET", hp: "325", tq: "495", mods: ["coilovers2", "exhaust2"] },
        { car: "2002 Honda Civic SI", owner: "Dallas Yatsinko", description: "I spent a lot of time fucking off, time go to beast mode with VTEC power baby.", engine: "B16C1", hp: "213", tq: "155", mods: ["coilovers3", "exhaust3"] }
    ]

    return (
        <>
            {backendBuildData.map(data => (
                <div className="buildcardcontainer" onClick={() => {
                    setModalIsOpen(true);
                    setModalData(data);
                }}>
                    <img src={logo} alt="Build Car" className="buildcardimage" />
                    <div className="buildcardinfo">
                        <h3 className="buildcardheader">{data.owner}'s {data.car}</h3>
                        <div className="buildcardbody">
                            <div className="buildcardlist">
                                <ul>
                                    <li>Engine: {data.engine}</li>
                                    <li>HP: {data.hp}</li>
                                    <li>Torque: {data.tq}</li>
                                </ul>
                            </div>
                            <div className="buildcarddesc">
                                <p>{data.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
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
                }}>{modalData.owner}'s {modalData.car}</Link></h3>
                <ModalSlideshow />
                <h3>Biography</h3>
                <p className='modalDesc'>{modalData.description}</p>
                <h3>Mod List</h3>
                <ul>
                    {Array.isArray(modalData.mods)
                        ? modalData.mods.map((mod, index) => {
                            return <li key={index}>{mod}</li>
                        })
                        :null}
                </ul>
            </Modal>
        </>
    );
}

export default BuildCard;
