import './buildcard.css';

import ModalSlideshow from '../modalSlideshow/modalSlideshow';
import CommentList from '../commentList/commentList';
import BuildImage from './buildImage/buildImage';
import { motion } from 'framer-motion';

import close from '../../assets/webp/closebutton.webp';

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
            <motion.div key={build._id} className="buildcardcontainer" onClick={() => {
                setModalIsOpen(true);
                setModalData(build);
            }} initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    default: {
                        duration: 0.1,
                        ease: "linear"
                    },
                    scale: {
                        type: "spring"
                    }
                }}>
                <BuildImage buildimages={build.buildimages} />
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
            </motion.div>))}
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
                <h3><Link to={`/profile/${modalData.username}`} onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}>{modalData.username}'s {modalData.year} {modalData.manufacturer} {modalData.model}</Link></h3>
                <ModalSlideshow slideImages={modalData.buildimages} />
                <h3>Biography</h3>
                <p className='modalDesc' id='bio'>{modalData.buildDescription}</p>
                <h3>Mod List</h3>
                <ul className='modalDesc'>
                    {modalData.mods && modalData.mods.map(mods =>
                        <li key={mods._id}>{mods.modtitle}</li>)}
                </ul>
                <h3>Comments: {modalData.commentCount}</h3>
                <CommentList comments={modalData.comments} />
            </Modal>
        </>
    );
}

export default BuildCard;
