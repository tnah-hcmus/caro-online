import React from "react";
import { Grid, Typography, makeStyles, withStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
// IMPORT ICON
import XIcon from "../../../assets/images/icons8-X.png";
import OIcon from "../../../assets/images/icons8-O.png";
import DinosaurIcon from "../../../assets/images/icon-dinosaur.png";
import CrocodileIcon from "../../../assets/images/icon-crocodile.png";
import MedalIcon from "../../../assets/images/icon-medal.png";
import Badge from "@material-ui/core/Badge";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const PlayerInfo = ({ type, coins, isWin, name, isTurn }) => {
  const classes = useStyles();
  return (
    <Grid item xs={5} className={isWin ? "rainbow" : ""}>
      <Grid container direction="row" justify="center" style={{ marginTop: 5 }}>
        <Grid item>
          <img src={MedalIcon} width={24} height={24} />
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color="secondary">
            {coins || 5}
          </Typography>
        </Grid>
      </Grid>
      {/* Turn's player */}
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        variant={isTurn ? "dot" : "standard"}
      >
        <Avatar alt="avatar" src={type == "X" ? CrocodileIcon : DinosaurIcon} className={classes.large} />
      </StyledBadge>
      <Tooltip title={name} arrow>
        <Typography variant="subtitle2" className={classes.noWrap}>
          {/* Player {type}: {name} */}
          {name}
        </Typography>
      </Tooltip>
      <img src={type == "X" ? XIcon : OIcon} width={24} height={24} />
    </Grid>
  );
};
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  noWrap: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));
export default PlayerInfo;
