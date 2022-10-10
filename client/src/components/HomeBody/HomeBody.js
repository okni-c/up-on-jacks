import './HomeBody.css';
import BuildCard from '../buildcard/buildcard';
import SearchBar from '../searchBar/searchBar';
import FollowerList from '../UserBody/FollowerList/FollowerList';
import { useQuery } from '@apollo/client';
import { QUERY_BUILDS, QUERY_ME_BASIC } from '../../utils/queries';
import { AnimatePresence, motion } from 'framer-motion';

import Auth from '../../utils/auth';


function HomeBody() {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_BUILDS);
  const builds = data?.builds || [];

  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const loggedIn = Auth.loggedIn();

  return (
    <motion.div initial={{ width: 0 }} animate={{ width: "100%", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.3 } }}>
      <div className='userHeroBackground'>
        <div className="hero container"><h2>The Real Car Social Media Site</h2></div>
      </div>
      {loggedIn && userData ? (
        <div>
          <FollowerList
            username={userData.me.username}
            friendCount={userData.me.friendCount}
            friends={userData.me.friends}
          />
        </div>
      ) : null}
      <section className="backgroundcolor">
        <div className="container">
          <SearchBar />
          <div className="sectionbox">
            <h2 className="bodyheader alignleft">Featured Builds</h2>
            <div>
              {loading ? (
                <h3>Loading...</h3>
              ) : (
                <AnimatePresence>
                  <BuildCard builds={builds} />
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export default HomeBody;
