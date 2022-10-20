import Header from "../../components/header/header";
import BuildsBody from '../../components/BuildsBody/buildsBody';
import Footer from "../../components/footer/footer";
import { motion } from 'framer-motion';

function ManageBuilds() {

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ duration: 0.2 }}>
      <Header />
      <BuildsBody />
      <Footer />
    </motion.div>
  );
}

export default ManageBuilds;