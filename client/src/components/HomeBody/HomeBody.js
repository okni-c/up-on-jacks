import './HomeBody.css';
import BuildCard from '../buildcard/buildcard';
import SearchBar from '../searchBar/searchBar';
import { useQuery } from '@apollo/client';
import { QUERY_BUILDS } from '../../utils/queries';


function HomeBody() {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_BUILDS);
  const builds = data?.builds || [];

  return (
    <>
      <div className='userHeroBackground'>
        <div className="hero container"><h2>The Real Car Social Media Site</h2></div>
      </div>
      <section className="backgroundcolor">
        <div className="container">
          <SearchBar />
          <div className="sectionbox">
            <h2 className="bodyheader alignleft">Featured Builds</h2>
            <div>
              {loading ? (
                <h3>Loading...</h3>
              ) : (
                <BuildCard builds={builds} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomeBody;
