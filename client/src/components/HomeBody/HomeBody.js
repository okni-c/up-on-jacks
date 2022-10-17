import './HomeBody.scss';
import BuildCard from '../buildcard/buildcard';
import SearchBar from '../searchBar/searchBar';
import { useQuery } from '@apollo/client';
import { QUERY_BUILDS, QUERY_ME_BASIC } from '../../utils/queries';
import { AnimatePresence } from 'framer-motion';


function HomeBody() {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_BUILDS);
  const { data:me } = useQuery(QUERY_ME_BASIC);

  const user = me?.me || {};

  const builds = data?.builds || [];

  return (
    <div>
      <div className='userHeroBackground'>
        <div className="hero container"><h1>The Real Car Social Media Site</h1></div>
      </div>
      <section className="backgroundcolor">
        <div className="container">
          <SearchBar />
          <div className="sectionbox">
            <h2 className="bodyheader alignleft">Newest Builds</h2>
            <div className='buildCardsBox'>
              {loading ? (
                <h3>Loading...</h3>
              ) : (
                <AnimatePresence>
                  <BuildCard builds={builds} user={user} />
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
