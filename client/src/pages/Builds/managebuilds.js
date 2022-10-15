import Header from "../../components/header/header";
import UserBuilds from '../../components/UserBuilds/userbuilds';
import Footer from "../../components/footer/footer";
import { motion } from 'framer-motion';
import './managebuilds.scss'

function ManageBuilds() {

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ duration: 0.2 }}>
      <Header />
      <UserBuilds />
      <Footer />
    </motion.div>
  );
}

export default ManageBuilds;