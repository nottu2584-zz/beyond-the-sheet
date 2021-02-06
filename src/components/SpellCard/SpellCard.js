import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: 450,
    height: 250,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  avatar: {
    height: 150,
    width: 150,
    maxHeight: "100%",
    maxWidth: "100%",
  },
  characterMisc: {
    span: {
      marginRight: 3,
    },
    race: {},
    gender: {},
  },
}));

const SpellCard = (props) => {
  const classes = useStyles();

  const { avatar, spellName, characterName } = props;

  //url idea for a card https://mui-treasury.com/components/card/
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <TableRow>
          <TableCell>
            <Typography variant="h5" component="h2">
              {spellName}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Chip
              avatar={
                <Avatar
                  alt={characterName}
                  src={avatar}
                  className={classes.avatar}
                />
              }
            />
          </TableCell>
        </TableRow>
        <Typography></Typography>
        <Typography></Typography>
        <Typography></Typography>
        <Typography variant="body2" component="p"></Typography>
      </CardContent>
    </Card>
  );
};

export default SpellCard;
