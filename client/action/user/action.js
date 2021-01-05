import { INIT_INFO, UPDATE_INFO, CLEAR_INFO, SET_USERS_LIST } from "./type";
import Axios from "axios";
export const initInfo = ({ name, email, coins, win, lose, draw, total, role }) => ({
  type: INIT_INFO,
  payload: { name, email, coins, win, lose, draw, total, role },
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
        console.log(user);
        dispatch(
          initInfo({
            name: user.name,
            email: user.email,
            coins: user.coins,
            win: user.win,
            lose: user.lose,
            total: user.games.length,
            draw: user.draw,
            role: user.role,
          })
        );
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
    dispatch(updateInfo("coins", user.coins + coins));
    if (isWin) dispatch(updateInfo("win", user.win + 1));
    else dispatch(updateInfo("lose", user.lose + 1));
  };
};

export const getUsersList = (token) => {
  return (dispatch) => {
    Axios.get("/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        dispatch(setUsersList(response.data.users));
      })
      .catch((e) => console.log(e.response));
  };
};
