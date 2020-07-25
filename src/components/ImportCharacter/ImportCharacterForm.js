import React, {useState} from 'react';

function ImportCharacterForm(props) {
    const [data, setData] = useState("Import Character Sheet Json")

    const handleChange = (event) => {
        setData({ value: event.target.value });
    }

    const handleSubmit = (event) => {
        alert('Json was submitted: ' + data);
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Essay:
        <textarea value={data} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default ImportCharacterForm;
