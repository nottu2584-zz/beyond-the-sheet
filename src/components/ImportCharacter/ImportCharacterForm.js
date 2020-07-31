import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";

const placeholder = "Import Character Sheet Json";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const ImportCharacterForm = (props) => {
  const classes = useStyles();
  const [data, setData] = useState(placeholder);

  const handleClick = (e) => {

  };

  const handleSubmit = (e) => {
    console.log(data);
    e.preventDefault();
  };

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <TextField
        id="outlined-full-width"
        label="Character Data"
        color="primary"
        style={{ margin: 8 }}
        placeholder={placeholder}
        helperText="Paste character data"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        onChange={(e) => setData(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Submit
      </Button>
    </form>
  );
}

export default ImportCharacterForm;
