import { SET_GAMES_LIST } from "./type";
import Axios from "axios";

export const setGamesList = (gamesList) => ({
  type: SET_GAMES_LIST,
  payload: { gamesList },
});

export const getGamesList = (token) => {
  return (dispatch) => {
    Axios.get("/api/games", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        dispatch(setGamesList(response.data));
      })
      .catch((e) => console.log(e.response));
  };
};
