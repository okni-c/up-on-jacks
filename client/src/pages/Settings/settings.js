import Header from "../../components/header/header";
import SettingsBody from '../../components/SettingsBody/SettingsBody';
import Footer from "../../components/footer/footer";
import { motion } from 'framer-motion';

function Settings() {

  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{ duration: 0.2 }}>
      <Header />
      <SettingsBody />
      <Footer />
    </motion.div>
  );
}

export default Settings;