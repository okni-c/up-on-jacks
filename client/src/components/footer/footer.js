import logo from '../../assets/webp/modernlogo.webp';
import twitter from '../../assets/webp/tw-social-icon.webp'
import tiktok from '../../assets/webp/tt-social-icon.webp'
import youtube from '../../assets/webp/yt-social-icon.webp'

import { Link } from 'react-router-dom';

import './footer.scss';

function Footer() {
    return (
        <div className='footerbackground'>
            <div className='container footerContainer'>
                <div id='footer1'>
                    <img src={logo} alt="up-on-jacks-logo" className="footerLogo" />
                    <ul className="footerlist">
                        <li><Link to="/">Legal</Link></li>
                        <li><Link to="/">About</Link></li>
                        <li><Link to="/">FAQ</Link></li>
                        <li><Link to="/">Careers</Link></li>
                    </ul>
                </div>
                <div id='footer2'>
                    <h2>Follow Us!</h2>
                    <ul className="footersocial">
                        <li><img src={twitter} alt="Twitter" id='tw' /><Link to="" className='link-spanner' aria-labelledby='tw' title='Twitter' /></li>
                        <li><img src={tiktok} alt="TikTok" id='tt' /><Link to="" className='link-spanner' aria-labelledby='tt' title='TikTok' /></li>
                        <li><img src={youtube} alt="YouTube" id='yt' /><Link to="" className='link-spanner' aria-labelledby='yt' title='YouTube' /></li>
                    </ul>
                </div>
            </div>
        </div>


    );
}

export default Footer;