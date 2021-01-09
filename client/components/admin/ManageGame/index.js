import React, { useEffect } from "react";

import { connect } from "react-redux";
import Table from "../Table";
import { makeStyles, Typography, Breadcrumbs, Link } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import GamesIcon from "@material-ui/icons/Games";
import { Link as RouteLink } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 22,
    height: 22,
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

function ManageGame(props) {
  const classes = useStyles();
  const generateData = (gamesList) => {
    const getStatus = (status) => {
      switch (status) {
        case 0:
          return "Game not end yet";
        case 1:
          return "X win";
        case 2:
          return "O win";
        case 3:
          return "Draw game";
        default:
          return "corrupt";
      }
    };

    return (gamesList || []).map((game, i) => {
      const stt = i + 1;
      const roomId = game.roomID;
      const date = moment(game.start).format("DD-MM-YYYY hh:mm:ss");
      const status = getStatus(game.status);
      const steps = `${game.history.length} steps`;
      const chat = `${game.chat.length} messages`;
      const actions = game._id;
      const tableType = "game";
      return { stt, roomId, date, status, steps, chat, actions, tableType };
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
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Steps",
        accessor: "steps",
      },
      {
        Header: "Chat",
        accessor: "chat",
      },
      {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true,
      },
    ],
    []
  );

  const data = React.useMemo(() => generateData(props.gamesList), []);

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
  return { gamesList: state.admin.gameList };
};

export default connect(mapStateToProps)(ManageGame);
