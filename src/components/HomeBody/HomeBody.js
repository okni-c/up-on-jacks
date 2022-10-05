import './HomeBody.css';
import BuildCard from '../buildcard/buildcard';


function HomeBody() {
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
            <BuildCard />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeBody;
