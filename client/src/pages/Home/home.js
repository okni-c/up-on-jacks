import Header from "../../components/header/header";
import HomeBody from "../../components/HomeBody/HomeBody";
import Footer from "../../components/footer/footer";
import { motion } from 'framer-motion';

function Home() {

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ duration: 0.5 }}>
      <Header />
      <HomeBody />
      <Footer />
    </motion.div>
  );
}

export default Home;