import React, { useEffect } from "react";

import { connect } from "react-redux";
import Table from "../Table";
import { makeStyles, Typography, Breadcrumbs, Link } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import GamesIcon from "@material-ui/icons/Games";
import { Link as RouteLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 30,
    height: 30,
  },
  label: {
    minWidth: 220,
  },
  container: {
    margin: "10px 0",
    background: "#ddd",
    boxShadow: "0 2px 8px grey",
    borderRadius: 8,
    padding: 15,
  },
}));

function ManageUser(props) {
  const classes = useStyles();
  const generateData = (usersList) => {
    return (usersList || []).map((user, i) => {
      const stt = i + 1;
      const email = user.email;
      const name = user.name;
      const verified = user.isVerified ? "Đã xác thực" : "Chưa xác thực";
      const blocked = user.isBlocked ? "Đã bị khóa" : "Chưa bị khóa";
      return { stt, email, name, verified, blocked };
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
      },
      {
        Header: "RoomID",
        accessor: "roomId",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Verified",
        accessor: "verified",
      },
      {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
      },
    ],
    []
  );

  const data = React.useMemo(() => generateData(props.usersList), []);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/admin" component={RouteLink} className={classes.link}>
          <HomeIcon className={classes.icon} />
          <Typography variant="body1" style={{ color: "inherit" }}>
            Dashboard
          </Typography>
        </Link>
        <Typography variant="body1" color="textPrimary" className={classes.link}>
          <GamesIcon className={classes.icon} />
          Manage Game
        </Typography>
      </Breadcrumbs>
      <div className={classes.container}>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { usersList: state.user.usersList };
};

export default connect(mapStateToProps)(ManageUser);
