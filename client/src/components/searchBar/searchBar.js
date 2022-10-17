import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { QUERY_SEARCH } from "../../utils/queries";
import { motion } from 'framer-motion';
import BuildCard from "../buildcard/buildcard";

import './searchBar.scss';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [getSearch, { loading, data }] = useLazyQuery(QUERY_SEARCH);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        getSearch({
            variables: { search: searchTerm }
        })
    };

    const builds = data || { searchBuilds: {} };
    const results = builds.searchBuilds.length;

    return (
        <div className="sectionbox">
            <h2 className="bodyheader" id='searchHeading'>Search Builds</h2>
            <form onSubmit={handleFormSubmit}>
                <input aria-labelledby='searchHeading' type="text" className="searchbar" placeholder="Search for your hoopty" name="search" id="search" onChange={event => setSearchTerm(event.target.value)} />
            </form>
            <br />

            {loading ? (
                <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            ) : (
                <></>
            )}
            <div className='buildCardsBox'>
                {results > 0 &&
                    <BuildCard builds={builds.searchBuilds} />
                }
            </div>
            {results === 0 &&
                <motion.p initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        default: {
                            duration: 0.1,
                            ease: "linear"
                        },
                        scale: {
                            type: "spring"
                        }
                    }} style={{ color: "white", fontSize: "30px" }}>No results</motion.p>}
        </div>
    );
}

export default SearchBar;