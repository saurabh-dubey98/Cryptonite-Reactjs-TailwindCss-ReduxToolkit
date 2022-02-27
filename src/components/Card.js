import React from 'react';

const Card = ({ children, hover }) => {
    return <div className={`p-3 rounded-md shadow-cardShadow ${hover && 'duration-300 hover:shadow-md hover:shadow-light-blue'}`}>
        {children}
    </div>;
};

export default Card;
