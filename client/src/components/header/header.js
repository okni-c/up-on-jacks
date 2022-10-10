import React, { useState } from 'react';
import logo from '../../assets/ModernLogoConcept.png';
import user from '../../assets/user.png'
import sedan from '../../assets/sedan.png'
import followers from '../../assets/followers.png'
import settings from '../../assets/settings.png'
import { Link } from 'react-router-dom';
import './header.css';
import { motion } from 'framer-motion';

import Auth from '../../utils/auth';

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function Header() {
  const [opened, setOpened] = useState(false);

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
      <div className="headerBoxBull container">
        <Link to='/' className="headerLink"><img src={logo} alt="up-on-jacks-logo" className="headerLogo" /></Link>
        <div className="headerList">
          {Auth.loggedIn() ? (
            <>
              <div className='usercontain' onFocus={expand} onBlur={close}>
                <button type="button" className="userbutton">UserNAME</button>
                {opened === true &&
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="userdropdown">
                    <p>UserNAME</p>
                    <ul>
                      <li><img src={user} className="userimg1" alt=""/><Link to='/profile'>Profile</Link></li>
                      <li><img src={sedan} className="userimg2" alt="" />Builds</li>
                      <li><img src={followers} className="userimg3" alt=""/>Following</li>
                      <li><img src={settings} className="userimg4" alt=""/>Settings</li>
                    </ul>
                    <Link to='/' onClick={logout}>Logout</Link>
                  </motion.div>}
              </div>
            </>
          ) : (
            <>
              <li><Link to='/signup'>Sign Up</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </>
          )}
        </div >
      </div >
    </div >
  );
}

export default Header;
