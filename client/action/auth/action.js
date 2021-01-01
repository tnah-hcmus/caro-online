import { LOGIN, LOGOUT, JOIN } from "./type";
import {initInfo, getInfo} from '../user/action';
import Axios from "axios";
export const login = (id, token) => ({
  type: LOGIN,
  payload: { id, token, inRoom: false },
});

export const joinState = (roomID) => ({
  type: JOIN,
  payload: roomID
})

export const logout = () => ({
  type: LOGOUT,
});

export const startLogin = (email, password, setMessage) => {
  return (dispatch, getState) => {
    Axios.post("/api/auth/local", { email, password })
      .then((res) => {
        const user = res.data;
        dispatch(login(user.id, user.accessToken));
        dispatch(getInfo(user.accessToken));
        //setMessage({ type: "success", content: `Login Successfully !!!`, open: true });
      })
      .catch((e) => {
        console.log(e);
        const error = e.response && e.response.data && e.response.data.error;
        setMessage({ type: "error", content: `${error || e.response.statusText}`, open: true });
      });
  };
};
export const startLoginAdmin = (email, password, history, setMessage) => {
  return (dispatch, getState) => {
    Axios.post("/api/admin/login", { email, password })
      .then((res) => {
        const { user, token } = res.data;
        dispatch(login(user._id, token));
        setMessage({ type: "success", content: `Login Successfully !!!`, open: true });
        history.push("/");
      })
      .catch((e) => {
        console.log(e);
        const error = e.response && e.response.data && e.response.data.error;
        setMessage({ type: "error", content: `${error || e.response.statusText}`, open: true });
      });
  };
};
export const startLoginThirdParty = (token, history) => {
  return (dispatch) => {
    Axios.post("/api/users/me", { }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
        const user = res.data;
        dispatch(login(user.id, user.accessToken));
        dispatch(initInfo({ name: user.name, email: user.email }));
        history.push("/");
    })
    .catch((e) => {
        console.log(e.response);
    });
  };
};
export const startSignUp = (data, setMessage) => {
  return (dispatch, getState) => {
    Axios.post("/api/users", { ...data })
      .then((res) => {
        const user = res.data;
        dispatch(login(user.id, user.token));
        dispatch(getInfo(user.accessToken));
        setMessage({ type: "success", content: `Signup Successfully !!!`, open: true });
      })
      .catch((e) => {
        const error = e.response && e.response.data && e.response.data.error;
        setMessage({ type: "error", content: `${error || e.response.statusText}`, open: true });
      });
  };
};
