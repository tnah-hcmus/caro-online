import { INIT_INFO, UPDATE_INFO, CLEAR_INFO, SET_USERS_LIST } from "./type";
import Axios from "axios";
import WSSubject from '../../socket/subject';
export const initInfo = ({ name, email, coins, win, lose, draw, total, role, games }) => ({
  type: INIT_INFO,
  payload: { name, email, coins, win, lose, draw, total, role, games, total: games.length },
});

export const updateInfo = (property, newData) => ({
  type: UPDATE_INFO,
  payload: { property, newData },
});

export const clearInfo = () => ({
  type: CLEAR_INFO,
});

export const setUsersList = (usersList) => ({
  type: SET_USERS_LIST,
  payload: { usersList },
});

export const getInfo = (token) => {
  return (dispatch) => {
    Axios.post(
      "/api/users/me",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        const user = res.data;
        dispatch(initInfo(user));
      })
      .catch((e) => {
        console.log(e);
      });
  };
};
export const updateName = (name, token, id) => {
  return (dispatch) => {
    Axios.patch(
      "/api/users/" + id,
      {
        property: "name",
        data: name,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(() => {
        WSSubject.updateName(name);
        dispatch(updateInfo("name", name));
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
};
export const updateUserAfterGame = (coins, isWin) => {
  return (dispatch, getState) => {
    const user = getState().user;
    
    if (isWin) {
      dispatch(updateInfo("coins", user.coins + coins));
      dispatch(updateInfo("win", user.win + 1));
    }
    else {
      dispatch(updateInfo("coins", user.coins - coins));
      dispatch(updateInfo("lose", user.lose + 1));
    }
  };
};


