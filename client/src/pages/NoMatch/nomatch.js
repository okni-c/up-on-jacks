import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import { motion } from 'framer-motion';

function NoMatch() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Header />
            <div className="container">
                <h3>Sorry, this page does not exist. 404 Error.</h3>
            </div>
            <Footer />
        </motion.div>
    );
}

export default NoMatch;