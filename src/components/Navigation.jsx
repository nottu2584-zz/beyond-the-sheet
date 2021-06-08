import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#635ee7",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  tabs: {},
}));

const Navigation = (props) => {
  const classes = useStyles();
  const { tab, handleChange } = props;

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <AppBar position="static" className={classes.root}>
      <StyledTabs
        className={classes.tabs}
        value={tab}
        onChange={handleChange}
        variant="fullWidth"
        aria-label="full width tabs"
      >
        <StyledTab label="Abilities" {...a11yProps(0)} />
        <StyledTab label="Status" {...a11yProps(1)} />
        <StyledTab label="Inventory" {...a11yProps(2)} />
        <StyledTab label="Currencies" {...a11yProps(3)} />
        <StyledTab label="Spells" {...a11yProps(4)} />
        <Typography className={classes.padding} />
      </StyledTabs>
    </AppBar>
  );
};

export default Navigation;
