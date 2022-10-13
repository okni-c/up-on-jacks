import './HomeBody.scss';
import BuildCard from '../buildcard/buildcard';
import SearchBar from '../searchBar/searchBar';
import FollowerList from '../UserBody/FollowerList/FollowerList';
import { useQuery } from '@apollo/client';
import { QUERY_BUILDS, QUERY_ME_BASIC } from '../../utils/queries';
import { AnimatePresence } from 'framer-motion';

import Auth from '../../utils/auth';


function HomeBody() {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_BUILDS);
  const builds = data?.builds || [];

  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const loggedIn = Auth.loggedIn();

  return (
    <div>
      <div className='userHeroBackground'>
        <div className="hero container"><h1>The Real Car Social Media Site</h1></div>
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
    </div>
  )
}

export default HomeBody;
