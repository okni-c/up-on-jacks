import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import './login.css';

function Login() {
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ duration: 0.2 }}>
            <Header />
            <motion.div initial={{width: 0}} animate={{width: "100%", transition: { duration: 0.5 }}} exit={{x: window.innerWidth, transition: { duration: 0.3 }}}>
            <div className='userHeroBackground'>
            </div>
            <div className="container">
                <div className="loginBox">
                    <h3>Login</h3>
                    <form>
                        <input type="text" placeholder="Enter your email" />
                        <input type="text" placeholder="Enter your password" />
                    </form>
                    <button type="button">Log In</button>
                    <p>Not a member yet? <Link to='/signup'>Sign Up!</Link></p>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            </motion.div>
            <Footer />
        </motion.div>
    );
}

export default Login;