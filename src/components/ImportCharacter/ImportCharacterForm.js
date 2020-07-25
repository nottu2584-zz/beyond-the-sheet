import React, { useState } from "react";

function ImportCharacterForm(props) {
  const [data, setData] = useState("Import Character Sheet Json");

  const handleChange = (e) => {
    console.log("DATA INPUT CHANGED", data);
    setData(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("DATA SUMMITTED", data);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Essay:
        <textarea placeholder={data} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default ImportCharacterForm;
