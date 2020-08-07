import React from "react";

const Item = (props) => {
    const {
        name,
        weight,
        quantity,
        cost,
        rarity,
        armorClass,
        type,
        damageDice,
        description,
        properties,
    } = props;
  
    return (
      <div className="container">
        <div>{name}</div>
        <div>{weight}</div>
        <div>{quantity}</div>
        <div>{cost}</div>
        <div>{rarity}</div>
        <div>{type}</div> 
        {armorClass ? 
          <div>{armorClass}</div>
          : null }
        {damageDice ?
          <div>{damageDice}</div>
        : null}
        <div>{description}</div>
        {properties ?
          <div>{properties.map((property, key) => {
            return (
            <div>{property.name}
            {property.notes?
            " ("+ property.notes +")": null}
            </div>
            )
          })}
          </div>
        : null}
      </div>
    );
};

export default Item;
    
