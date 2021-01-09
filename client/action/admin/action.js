import { INIT_GAME_LIST, INIT_USER_LIST, UPDATE_USER } from "./type";;
import Axios from "axios";
export const initUsers = (list) => ({
  type: INIT_USER_LIST,
  payload: list,
});
export const initGames = (list) => ({
    type: INIT_GAME_LIST,
    payload: list,
});
export const updateUser = (id, property, value) => ({
  type: UPDATE_USER,
  payload: {id, property, value},
});

export const getUsersList = (token, secret) => {
    return (dispatch) => {
      Axios.get("/api/users", {
        headers: { Authorization: `Bearer ${token} ${secret}` },
      })
        .then((res) => {
          dispatch(initUsers(res.data));
        })
        .catch((e) => console.log(e.response));
    };
};

export const getGamesList = (token, secret) => {
    return (dispatch) => {
      Axios.get("/api/games", {
        headers: { Authorization: `Bearer ${token} ${secret}` },
      })
        .then((res) => {
          dispatch(initGames(res.data));
        })
        .catch((e) => console.log(e.response));
    };
};

export const blockUser = (id, secret, token) => {
  return (dispatch) => {
    Axios.delete("/api/users/" + id, {
      headers: { Authorization: `Bearer ${token} ${secret}` },
    })
      .then((res) => {
        dispatch(updateUser(id, 'isBlocked', true));
      })
      .catch((e) => console.log(e.response));
  };
};