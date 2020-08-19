import React from 'react';

const Currencies = (props) => {
    const {
        cp,
        ep,
        gp,
        pp,
        sp,
    }= props;

    return (
        <div className="container">
            <div>Platinum: {pp}</div> 
            <div>Gold: {gp}</div>
            <div>Electrum: {ep}</div>
            <div>Silver: {sp}</div>
            <div>Copper: {cp}</div>
        </div>
    );
};

export default Currencies;