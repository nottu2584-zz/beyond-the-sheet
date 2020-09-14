import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ClearIcon from "@material-ui/icons/Clear";
import SendIcon from "@material-ui/icons/Send";
import React, { useContext, useState } from "react";
import { StoreContext } from "../App/App";

const placeholder = "{ ... }";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
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
  const { dispatch } = useContext(StoreContext);
  const classes = useStyles();
  const [data, setData] = useState();

  const handleSubmitClick = (e) => {};

  const handleResetClick = (e) => {
    setData("");
  };

  const handleSubmit = (e) => {
    // Prevent submit
    e.preventDefault();
    // Get characters
    if (data && typeof data === "string")
      dispatch({ type: "UPDATE", payload: JSON.parse(data) });
  };

  const handleChange = (e) => {
    e.target.value && typeof e.target.value === "string"
      ? setData(e.target.value)
      : setData("");
  };

  return (
    <form className={classes} onSubmit={handleSubmit}>
      <TextField
        id="character-data"
        label="Character Data"
        color="primary"
        style={{ margin: 8 }}
        placeholder={placeholder}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        onChange={handleChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<SendIcon />}
        onClick={handleSubmitClick}
      >
        Submit
      </Button>
      <Button
        type="reset"
        variant="outlined"
        color="secondary"
        startIcon={<ClearIcon />}
        onClick={handleResetClick}
      >
        Clear
      </Button>
    </form>
  );
};

export default ImportCharacterForm;
