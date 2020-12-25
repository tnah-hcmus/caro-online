import React from "react";
import { Grid, Button, makeStyles, Typography, withStyles } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Avatar from "@material-ui/core/Avatar";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import PanToolIcon from "@material-ui/icons/PanTool";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import FiberNewIcon from "@material-ui/icons/FiberNew";
import InfoIcon from "@material-ui/icons/Info";
import Countdown from "./Countdown";

// IMPORT ICON
import vsIcon from "../../assets/images/icons8-vs-button-96.png";
import XIcon from "../../assets/images/icons8-X.png";
import OIcon from "../../assets/images/icons8-O.png";
import DinosaurIcon from "../../assets/images/icon-dinosaur.png";
import CrocodileIcon from "../../assets/images/icon-crocodile.png";

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

const Status = (props) => {
  const { onGetStatus } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid container item xs={12} className={classes.section}>
        <Grid item xs={12} container direction="row" className={classes.title}>
          <Grid item className={classes.icon}>
            <InfoIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6">Info</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} className={classes.statusWrapper}>
          <Grid container item={12} justify="space-around" className={classes.infoPlayer}>
            <Grid item xs={5}>
              {/* Turn's player */}
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar alt="avatar" src={CrocodileIcon} className={classes.large} />
              </StyledBadge>
              <Tooltip title="Player 01" arrow>
                <Typography variant="subtitle2" className={classes.noWrap}>
                  Player 01
                </Typography>
              </Tooltip>
              <img src={XIcon} width={24} height={24} />
            </Grid>
            <Grid item xs={2} fontSize="large" className={classes.iconRed}>
              <img src={vsIcon} width={50} height={50} />
            </Grid>
            <Grid item xs={5}>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                // variant="dot" // not turn's player
              >
                <Avatar alt="avatar" src={DinosaurIcon} className={classes.large} />
              </StyledBadge>
              <Tooltip title="Player 02" arrow>
                <Typography variant="subtitle2" className={classes.noWrap}>
                  Player 02
                </Typography>
              </Tooltip>
              <img src={OIcon} width={24} height={24} />
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.countdown}>
            <Countdown time={30} />
          </Grid>
        </Grid>
      </Grid>

      <Grid container item xs={12} className={classes.section}>
        <Grid item xs={12} container direction="row" className={classes.title}>
          <Grid item className={classes.icon}>
            <SettingsIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6">Function</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="center" className={classes.statusWrapper}>
          <Grid item xs={11} className={classes.button}>
            <Button variant="contained" color="secondary" startIcon={<FiberNewIcon />} fullWidth>
              New Game
            </Button>
          </Grid>
          <Grid item xs={11} className={classes.button}>
            <Button variant="contained" color="primary" startIcon={<ThumbUpIcon />} fullWidth>
              Please Draw
            </Button>
          </Grid>
          <Grid item xs={11} className={classes.button}>
            <Button variant="contained" color="primary" startIcon={<PanToolIcon />} fullWidth>
              Give Up
            </Button>
          </Grid>
          <Grid item xs={11} className={classes.button}>
            <Button variant="contained" color="secondary" startIcon={<ExitToAppIcon />} fullWidth>
              Leave Room
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item xs={12} className={classes.section}>
        <Grid item xs={12} container direction="row" className={classes.title}>
          <Grid item className={classes.icon}>
            <SupervisorAccountIcon />
          </Grid>
          <Grid item>
            <Typography variant="h6">Viewers</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12} className={classes.statusWrapper} style={{ maxHeight: 140, overflow: "auto" }}>
          <Grid container item xs={12}>
            <Grid item>
              <Avatar
                alt="avatar"
                src={Math.round(Math.random()) ? DinosaurIcon : CrocodileIcon}
                className={classes.small}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Viewer 1</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item>
              <Avatar
                alt="avatar"
                src={Math.round(Math.random()) ? DinosaurIcon : CrocodileIcon}
                className={classes.small}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Viewer 1</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item>
              <Avatar
                alt="avatar"
                src={Math.round(Math.random()) ? DinosaurIcon : CrocodileIcon}
                className={classes.small}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Viewer 1</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item>
              <Avatar
                alt="avatar"
                src={Math.round(Math.random()) ? DinosaurIcon : CrocodileIcon}
                className={classes.small}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Viewer 1</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item>
              <Avatar
                alt="avatar"
                src={Math.round(Math.random()) ? DinosaurIcon : CrocodileIcon}
                className={classes.small}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Viewer 1</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item>
              <Avatar
                alt="avatar"
                src={Math.round(Math.random()) ? DinosaurIcon : CrocodileIcon}
                className={classes.small}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">Viewer 1</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Status;

const useStyles = makeStyles((theme) => ({
  section: {},
  title: {
    fontWeight: "bold",
  },
  statusWrapper: {
    background: "#ddd",
    borderRadius: "0.8rem",
    padding: 5,
    marginBottom: 20,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    "&> button": {
      margin: "5px 0",
    },
  },
  icon: {
    margin: "auto 0",
  },
  iconRed: {
    margin: "auto 0",
    color: "red",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  infoPlayer: {
    margin: 5,
    "&>div": {
      textAlign: "center",
    },
  },
  button: {
    margin: "5px 0",
  },
  counter: {},
  noWrap: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  countdown: {
    textAlign: "center",
  },
}));
