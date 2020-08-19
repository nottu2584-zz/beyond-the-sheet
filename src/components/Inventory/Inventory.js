import React from "react";

const Inventory = (props) => {
    
    return (
        <div className="container">
            {props.children}
        </div>
    );
};

export default Inventory;
