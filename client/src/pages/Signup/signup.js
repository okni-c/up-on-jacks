import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


function SignUp() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header />
            <motion.div initial={{width: 0}} animate={{width: "100%", transition: { duration: 0.5 }}} exit={{x: window.innerWidth, transition: { duration: 0.3 }}}>
            <div className='userHeroBackground'>
            </div>
            <div className="container">
                <div className="loginBox">
                    <h3>Sign Up</h3>
                    <form>
                        <input type="text" placeholder="Enter your email" />
                        <input type="text" placeholder="Enter your password" />
                    </form>
                    <button type="button">Sign Up</button>
                    <p>Already have an account? <Link to='/login'>Log In!</Link></p>
                </div>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
            </div>
            </motion.div>
            <Footer />
        </motion.div>
    );
}

export default SignUp;