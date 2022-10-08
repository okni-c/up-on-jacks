import React from 'react';

const BuildImage = ({ buildimages }) => {
    return (
        <>
            {buildimages && buildimages[0] && (
                <img src={buildimages[0].image} alt="Build Car" className="buildcardimage" />
            )}
        </>
    );
};

export default BuildImage;