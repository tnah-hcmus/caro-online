import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Bg from "../../assets/images/bg-rank.jpg";
import IcMedal from "../../assets/images/icon-medal.png";
import IcDinosaur from "../../assets/images/icon-dinosaur.png";
import IcCrocodile from "../../assets/images/icon-crocodile.png";
import IcTop1 from "../../assets/images/top1.png";
import IcTop2 from "../../assets/images/top2.png";
import IcTop3 from "../../assets/images/top3.png";
import IcTop5 from "../../assets/images/top5.png";

function RankChart(props) {
  const classes = useStyles();

  const top10 = [
    { name: "player 01", medal: 5 },
    { name: "player 01", medal: 5 },
    { name: "player 01", medal: 5 },
    { name: "player 01", medal: 5 },
    { name: "player 01", medal: 5 },
    { name: "player 01", medal: 5 },
  ];

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        alignContent="center"
        className={classes.container}
      >
        <Grid item xs={12} className={classes.title}>
          <Typography variant="h5" color="initial">
            LEADER BOARD
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          className={classes.top10}
        >
          {top10.map((row, i) => (
            <Grid
              key={i}
              item
              xs={12}
              container
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
            >
              <Grid item xs={2} style={{ textAlign: "center" }}>
                <img src={i === 0 ? IcTop1 : i === 1 ? IcTop2 : i === 2 ? IcTop3 : IcTop5} width={48} height={56} />
              </Grid>
              <Grid item xs={8} container direction="row" wrap="nowrap">
                <Grid item className={classes.avatar}>
                  <img src={IcDinosaur} width={52} height={52} />
                </Grid>
                <Grid item style={{ margin: "auto 10px", overflow: "hidden" }}>
                  <Typography variant="h6" color="initial" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                    {row.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={2} container direction="row">
                <Grid item style={{ margin: "auto 0" }}>
                  <img src={IcMedal} width={32} height={32} />
                </Grid>
                <Grid item style={{ margin: "auto 0" }}>
                  <Typography variant="h6" color="initial">
                    52
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default RankChart;

const useStyles = makeStyles({
  root: {
    height: "calc(100vh - 64px)",
    width: "100vw",
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: `url(${Bg})`,
  },
  container: {
    position: "absolute",
    // top: "50%",
    // left: "50%",
    zIndex: 2,
  },
  top10: {
    boxShadow: `0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset`,
    borderRadius: 12,
    marginTop: 65,
    width: "40%",
    background: "white",
    "&>div": {
      padding: "5px 10px",
    },
    "&>div:first-child": {
      marginTop: 25,
    },
    "&>div:last-child": {
      borderTop: "1px solid #ddd",
      borderRadius: 12,
      boxShadow: "0 2px 3px black",
    },
    "&:before, &:after": {
      position: "absolute",
      zIndex: -1,
      boxShadow: "0 0 20px rgba(0,0,0,0.8)",
      top: 10,
      bottom: 10,
      left: 0,
      right: 0,
      borderRadius: "100px / 10px",
    },
    "&:after": {
      right: 10,
      left: "auto",
      transform: "skew(8deg) rotate(3deg)",
    },
  },
  title: {
    position: "absolute",
    top: 35,
    background: "#e43c3c",
    borderRadius: 12,
    color: "white",
    padding: "10px 40px",
    boxShadow: "0 8px 6px -6px black",
  },
  avatar: {
    borderRadius: "50%",
    background: "#ddd",
  },
});
