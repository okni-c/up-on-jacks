import './App.css';
import BuildCard from './components/buildcard/buildcard';

function App() {
  return (
    <section class="backgroundcolor">
    <div className="container">
      <div className="sectionbox">
        <h2 className="bodyheader">Search Builds</h2>
        <input type="text" class="searchbar" placeholder="Search for your hoopty" />
      </div>
      <div className="sectionbox">
        <h2 className="bodyheader alignleft">Featured Builds</h2>
        <div>
        <BuildCard />
        <BuildCard />
        <BuildCard />
        </div>
      </div>
    </div>
    </section>
  );
}

export default App;
