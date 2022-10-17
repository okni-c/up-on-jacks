import React, { useEffect, useState } from 'react';
import logo from '../../assets/webp/modernlogo.webp';
import profile from '../../assets/webp/user.webp'
import sedan from '../../assets/webp/sedan.webp'
import dwnArrow from '../../assets/webp/down-arrow.webp';
import followers from '../../assets/webp/followers.webp'
import settings from '../../assets/webp/settings.webp'
import { Link } from 'react-router-dom';
import './header.scss';
import { motion } from 'framer-motion';

import { useLazyQuery } from '@apollo/client';

import Auth from '../../utils/auth';
import { QUERY_ME_BASIC } from '../../utils/queries';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function Header() {
  const [opened, setOpened] = useState(false);
  const [rotate, setRotate] = useState({ rotate: "0deg" });

  const [searchProfImg, { data }] = useLazyQuery(QUERY_ME_BASIC);
  const user = data?.me || {};

  const loggedIn = Auth.loggedIn();

  useEffect(() => {
    if (loggedIn) {
      searchProfImg();
    }
  }, [loggedIn, searchProfImg])

  async function expand() {
    setRotate({ rotate: "180deg" });
    await delay(110);
    setOpened(true);
  }

  async function close() {
    setRotate({ rotate: "0deg" });
    await delay(110);
    setOpened(false);
  }


  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="headerBackground">
      <div className="headerBox container">
        <Link to='/' className="linkLogo">
          <img src={logo} alt="up-on-jacks-logo" className="headerLogo" />
        </Link>

        {loggedIn ? (
          <div className='userBox' onFocus={expand} onBlur={close}>
            <button className='userIconButton'>
              <img src={user.profileimg} alt="user profile icon" />
              <img src={dwnArrow} style={rotate} alt="down arrow" />
            </button>
            {opened === true &&
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.1 } }} exit={{ opacity: 0 }} className="userDropdown">
                <p>{user.username}</p>
                <ul>
                  <li><Link to='/profile'><img aria-hidden="true" src={profile} className="userP" alt="" />Profile</Link></li>
                  <li><Link to='/managebuilds'><img aria-hidden="true" src={sedan} className="userB" alt="" />Builds</Link></li>
                  <li><Link to='/'><img aria-hidden="true" src={followers} className="userF" alt="" />Following</Link></li>
                  <li><Link to='/'><img aria-hidden="true" src={settings} className="userS" alt="" />Settings</Link></li>
                  <li id='logout'><Link to='/' onClick={logout}>Logout</Link></li>
                </ul>
              </motion.div>}
          </div>
        ) : (
          <div className="headerList">
            <ul>
              <li><Link to='/signup'>Sign Up</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </ul>
          </div >
        )}

      </div >
    </div >
  );
}

export default Header;
