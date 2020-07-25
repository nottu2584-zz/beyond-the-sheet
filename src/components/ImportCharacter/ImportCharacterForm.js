import React, { useState } from "react";

const placeholder = "Import Character Sheet Json";

function ImportCharacterForm(props) {
  const [data, setData] = useState(placeholder);

  const handleSubmit = (e) => {
    console.log("DATA SUMMITTED", data);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <textarea placeholder={placeholder} onChange={e => setData(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default ImportCharacterForm;
