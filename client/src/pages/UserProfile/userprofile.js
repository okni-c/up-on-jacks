import Header from '../../components/header/header';
import UserBody from '../../components/UserBody/userbody';
import Footer from '../../components/footer/footer';
import './userprofile.css';
import { motion } from 'framer-motion';


function Userprofile() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header />
            <UserBody />
            <Footer />
        </motion.div>
    );
}

export default Userprofile;
