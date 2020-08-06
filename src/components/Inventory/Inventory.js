import React from "react";

const Inventory = (props) => {
    
    console.log("Prueba children", props.children)

    return (
        <div className="container">
            {props.children}
        </div>
    );
};

export default Inventory;
