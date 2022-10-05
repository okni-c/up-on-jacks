import './HomeBody.css';
import BuildCard from '../buildcard/buildcard';
import { useQuery } from '@apollo/client';
import { QUERY_BUILDS } from '../../utils/queries';


function HomeBody() {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_BUILDS);
  const builds = data?.builds || [];

  return (
    <section className="backgroundcolor">
      <div className="container">
        <div className="sectionbox">
          <h2 className="bodyheader">Search Builds</h2>
          <input type="text" className="searchbar" placeholder="Search for your hoopty" />
        </div>
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
  );
}

export default HomeBody;
