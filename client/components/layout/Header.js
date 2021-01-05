import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Link } from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import iconLogo from "../../assets/images/icon-logo.png";
import {connect} from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "&>header": {
      backgroundColor: "#d2d2d2",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: 24,
    fontFamily: "Playball",
    justifyContent: "center",
    "& > a": {
      color: "white",
      "&:hover": {
        textDecoration: "none",
      },
    },
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleSignout = () => {
    console.log("LOGOUT");
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <Link component={RouterLink} to="/">
                {/* <img src={iconLogo} width={50} height={50} /> */}
                Caro Online
              </Link>
            </Typography>
            <div>
              <IconButton ref={anchorRef} onClick={handleToggle} color="inherit">
                <AccountCircle />

                <Typography variant="subtitle2" color="initial">
                  {props.name}
                </Typography>
              </IconButton>
              <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" transition>
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList autoFocusItem={open} id="menu-list-grow">
                          <MenuItem onClick={() => history.push("/profile")}>Profile</MenuItem>
                          <MenuItem onClick={() => history.push("/changepassword")}>Change password</MenuItem>
                          <MenuItem onClick={() => history.push("/rank")}>Ranking</MenuItem>
                          <MenuItem onClick={handleSignout}>Logout</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {props.children}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    name: state.user.name,
  };
};
export default connect(mapStateToProps)(Header);
