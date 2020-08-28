import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {},
}));

const Status = (props) => {
    const classes = useStyles();

    const {
        avatar,
        characterName,
        hitPoints,
        armorClass,
        experience,
        conditions
    } = props;

    return (
        <TableRow>
            <TableCell>
                <Chip
                avatar={
                    <Avatar
                    alt={characterName}
                    src={avatar}
                    className={classes.avatar}
                    />
                }
                label={characterName}
                variant="outlined"
                />
            </TableCell>
            <TableCell>{hitPoints}</TableCell>
            <TableCell>{armorClass}</TableCell>
            <TableCell>{experience}</TableCell>
            <TableCell>{conditions}</TableCell>
        </TableRow>
    )
};

export default Status; 
