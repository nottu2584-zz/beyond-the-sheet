import React from "react";

const Item = (props) => {
    const {
        name,
        weight,
        quantity,
        cost,
        rarity,
    } = props;


  console.log("Prueba de Item: %s" , props.name, props)
    
    return (
      <div className="container">
        <div>{name}</div>
        <div>{weight}</div>
        <div>{quantity}</div>
        <div>{cost}</div>
        <div>{rarity}</div>
      </div>
    );
};

export default Item;
    
