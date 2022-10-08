import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';

import close from '../../../assets/closebutton.png';

import './FollowerList.css';

const FollowerList = ({ followerCount, username, followers, profileimg }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);


  if (!followers || !followers.length) {
    return <p className="">0 followers</p>;
  }

  return (
    <div>
      <p onClick={() => {
        setModalIsOpen(true);
      }}>
        {followerCount} {followerCount === 1 ? 'follower' : 'followers'}
      </p>
      <Modal
        isOpen={modalIsOpen}
        closeTimeoutMS={200}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}>
        <button onClick={() => setModalIsOpen(false)}><img src={close} alt="Close Button" /></button>
        <h3>{username}'s followers</h3>
        <ul className='modalDesc'>
          {followers.map(follower => (
            <li>
              <img src={profileimg} className="followerProfileImg" alt="test"/>
              <Link to={`/profile/${follower.username}`}>{follower.username}</Link>
            </li>
          ))}
        </ul>

      </Modal>
    </div>
  );
};

export default FollowerList;