import React from 'react';

const Stats = ({ statName, statData }) => {
    return <div className="p-3 rounded-md shadow-cardShadow">
        <div className="text-sm">{statName}</div>
        <div className="text-xl font-medium mt-2">{statData}</div>
    </div>
};

export default Stats;
