import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_SEARCH } from "../../utils/queries";
import BuildCard from "../buildcard/buildcard";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("honda");
    const [getSearch, { loading, data }] = useLazyQuery(QUERY_SEARCH);
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        getSearch({
            variables: { search: searchTerm } 
        })
        console.log(searchTerm);
        console.log(data);
    };

    const builds = data || {};

    return (
        <div className="sectionbox">
            <h2 className="bodyheader">Search Builds</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="text" className="searchbar" placeholder="Search for your hoopty" name="search" id="search" onChange={event => setSearchTerm(event.target.value)} />
            </form>
                <br />
                {loading ? (
                <h3>Loading...</h3>
              ) : (
                <BuildCard builds={builds.searchBuilds} />
              )}
                
            
            
        </div>
    );
}

export default SearchBar;