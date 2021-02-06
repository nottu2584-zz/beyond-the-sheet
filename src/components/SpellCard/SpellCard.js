import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import { Column, Item, Row } from "@mui-treasury/components/flex";
import { Info, InfoSubtitle, InfoTitle } from "@mui-treasury/components/info";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    "&:before": {
      transition: "0.2s",
      position: "absolute",
      width: "100%",
      height: "100%",
      content: '""',
      display: "block",
      borderRadius: "1rem",
      backgroundColor: "#fff",
      zIndex: 0,
      bottom: 0,
    },
  },
  card: {
    zIndex: 1,
    position: "relative",
    borderRadius: "1.5rem ",
    boxShadow: "0 0px 100px 0 #060606",
    background: "#2C3E50",
    transition: "0.4s",
    height: "100%",
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
  logo: {
    width: 48,
    height: 48,
    borderRadius: "0.75rem",
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

  const {
    avatar,
    spellName,
    characterName,
    school,
    level,
    time,
    hitDC,
    range,
    components,
    duration,
    link,
  } = props;

  const schoolLogo = (school) => {
    switch (school) {
      case "Abjuration":
        return "https://www.dndbeyond.com/Content/Skins/Waterdeep/images/spell-schools/35/abjuration.png";
      case "Conjuration":
        return "https://www.dndbeyond.com/Content/Skins/Waterdeep/images/spell-schools/35/conjuration.png";
      case "Divination":
        return "https://www.dndbeyond.com/Content/Skins/Waterdeep/images/spell-schools/35/divination.png";
      case "Enchantment":
        return "https://www.dndbeyond.com/Content/Skins/Waterdeep/images/spell-schools/35/enchantment.png";
      case "Evocation":
        return "https://www.dndbeyond.com/Content/Skins/Waterdeep/images/spell-schools/35/evocation.png";
      case "Illusion":
        return "https://www.dndbeyond.com/Content/Skins/Waterdeep/images/spell-schools/35/illusion.png";
      case "Necromancy":
        return "https://www.dndbeyond.com/Content/Skins/Waterdeep/images/spell-schools/35/necromancy.png";
      case "Transmutation":
        return "https://www.dndbeyond.com/Content/Skins/Waterdeep/images/spell-schools/35/transmutation.png";
      default:
        return null;
    }
  };

  //url idea for a card https://mui-treasury.com/components/card/
  return (
    <Card className={classes.root}>
      <Column className={classes.card}>
        <Row p={2} gap={2} pb={1}>
          <TableCell>
            <Avatar
              className={classes.logo}
              variant={"rounded"}
              src={schoolLogo(school)}
            />
          </TableCell>
          <TableCell>
            <Info position={"middle-left"}>
              <InfoTitle>{spellName}</InfoTitle>
              <InfoSubtitle>
                {school}
                {` `}
                {level}
              </InfoSubtitle>
            </Info>
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </Row>
        <Row>
          <Box
            pb={1}
            px={2}
            color={"#fff"}
            fontSize={"0.875rem"}
            fontFamily={"Ubuntu"}
          >
            <TableCell>{time} </TableCell>
            <TableCell>{range}</TableCell>
            <TableCell> {hitDC}</TableCell>
            <TableCell> {duration} </TableCell>
            <TableCell>{components}</TableCell>
          </Box>
        </Row>
        <Box
          pb={1}
          px={2}
          color={"#fff"}
          fontSize={"0.875rem"}
          fontFamily={"Ubuntu"}
        >
          <Link
            href={link}
            variant="body2"
          >
            {link}
          </Link>
        </Box>

        <Row p={2} gap={2} position={"bottom"}>
          <Item position={"middle-right"}>
            <Chip
              avatar={
                <Avatar
                  alt={characterName}
                  src={avatar}
                  className={classes.avatar}
                />
              }
            />
          </Item>
        </Row>
      </Column>
    </Card>

    // <Card className={classes.root}>
    //   <CardContent className={classes.content}>
    //     <TableRow>
    //       <TableCell>y
    //         <Typography variant="h5" component="h2">
    //           {spellName}
    //         </Typography>
    //       </TableCell>
    //     </TableRow>
    //     <TableRow>
    //       <TableCell></TableCell>
    //       <TableCell></TableCell>
    //       <TableCell></TableCell>
    //       <TableCell>
    //         <Chip
    //           avatar={
    //             <Avatar
    //               alt={characterName}
    //               src={avatar}
    //               className={classes.avatar}
    //             />
    //           }
    //         />
    //       </TableCell>
    //     </TableRow>
    //     <Typography></Typography>
    //     <Typography></Typography>
    //     <Typography></Typography>
    //     <Typography variant="body2" component="p"></Typography>
    //   </CardContent>
    // </Card>
  );
};

export default SpellCard;
