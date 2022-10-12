import React, { useState } from 'react';
import logo from '../../assets/webp/modernlogo.webp';
import user from '../../assets/webp/user.webp'
import sedan from '../../assets/webp/sedan.webp'
import followers from '../../assets/webp/followers.webp'
import settings from '../../assets/webp/settings.webp'
import { Link } from 'react-router-dom';
import './header.scss';
import { motion } from 'framer-motion';

import Auth from '../../utils/auth';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function Header() {
  const [opened, setOpened] = useState(true);

  function expand() {
    setOpened(true);
  }

  async function close() {
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
        <Link to='/' className="linkLogo"><img src={logo} alt="up-on-jacks-logo" className="headerLogo" /></Link>
        {Auth.loggedIn() ? (
          <div className='userBox' onFocus={expand} onBlur={close}>
            <button className='userIconButton'>
              <img src={user} alt="user profile icon" />
              <p>Username</p>
            </button>
            {opened === true &&
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.2 } }} exit={{ opacity: 0 }} className="userDropdown">
                <ul>
                  <li><Link to='/profile'><img aria-hidden="true" src={user} className="userP" alt="" />Profile</Link></li>
                  <li><Link to='/'><img aria-hidden="true" src={sedan} className="userB" alt="" />Builds</Link></li>
                  <li><Link to='/'><img aria-hidden="true" src={followers} className="userF" alt="" />Following</Link></li>
                  <li><Link to='/'><img aria-hidden="true" src={settings} className="userS" alt="" />Settings</Link></li>
                  <li><Link to='/' onClick={logout}>Logout</Link></li>
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
