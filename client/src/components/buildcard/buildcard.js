import './buildcard.scss';

import ModalSlideshow from '../modalSlideshow/modalSlideshow';
import CommentList from '../commentList/commentList';
import BuildImage from './buildImage/buildImage';
import { motion } from 'framer-motion';
import { useLazyQuery } from '@apollo/client';

import close from '../../assets/webp/closebutton.webp';

import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { QUERY_USER_PIC } from '../../utils/queries';

// Modal.setAppElement('#modal');

function BuildCard({ builds }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState(' ');

    const [searchProfImg, { data }] = useLazyQuery(QUERY_USER_PIC, {
        variables: {username: modalData.username}
    });

    const user = data?.user || {};

    useEffect(() => {
        if (modalIsOpen) {
            searchProfImg();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset'
        }
    }, [modalIsOpen, searchProfImg])

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
                <div className="buildcardinfo">
                    <h3 className="buildcardheader">{build.username}'s</h3>
                    <BuildImage buildimages={build.buildimages} />
                    <h3 className="buildcardheader">{build.year} {build.manufacturer} {build.model}</h3>
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
                <button onClick={() => setModalIsOpen(false)}>
                    <img src={close} alt="Close Button" />
                </button>
                <img src={user.profileimg} alt="user profile" style={{width: "150px"}}/>
                <h3>
                    <Link to={`/profile/${modalData.username}`} onClick={() => {
                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}>
                        {modalData.username}'s <br /> {modalData.year} {modalData.manufacturer} {modalData.model}
                    </Link>
                </h3>
                <ModalSlideshow slideImages={modalData.buildimages} />

                <h3>Biography</h3>
                <p className='modalDesc' id='bio'>{modalData.buildDescription}</p>

                <h3>Mod List</h3>
                <ul className='modalDesc'>
                    {modalData.mods && modalData.mods.map(mods =>
                        <li key={mods._id}>{mods.modtitle}</li>)}
                </ul>

                <CommentList comments={modalData.comments} buildId={modalData._id} commentCount={modalData.commentCount} />
            </Modal>
        </>
    );
}

export default BuildCard;
