import { LOGIN, LOGOUT, JOIN, UPDATE_TOKEN } from "./type";
import { initInfo, getInfo, updateInfo, clearInfo } from "../user/action";
import Axios from "axios";
import WSSubject from '../../socket/subject';
export const login = (id, token) => ({
  type: LOGIN,
  payload: { id, token, inRoom: false },
});

export const joinState = (roomID) => ({
  type: JOIN,
  payload: roomID,
});

export const updateToken = (token) => ({
  type: UPDATE_TOKEN,
  payload: token,
});

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
      .catch((e) => {;
        const error = e.response && e.response.data && e.response.data.error;
        setMessage({ type: "error", content: `${error || e.response.statusText}`, open: true });
      });
  };
};
export const startLoginAdmin = (username, password, token, history, setMessage) => {
  return (dispatch) => {
    Axios.post(
      "/api/admin/auth",
      { username, password },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        const { token } = res.data;
        dispatch(updateInfo("secretKey", token));
        history.push("/admin/dashboard");
      })
      .catch((e) => {
        const error = e.response && e.response.data && e.response.data.error;
        setMessage({ type: "error", content: `${error || e.response.statusText}`, open: true });
      });
  };
};
export const startLoginThirdParty = (token, history) => {
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
        dispatch(login(user.id, user.accessToken));
        dispatch(initInfo(user));
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

export const changePassword = (oldPass, newPass, id, token) => {
  return (dispatch) => {
    return Axios.put(
      "/api/users/" + id + "/password",
      {
        oldPass,
        newPass,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        const token = res.data;
        dispatch(updateToken(token));
        return { status: true };
      })
      .catch((e) => {
        const error = e.response && e.response.data && e.response.data.error;
        return { status: false, content: { type: "error", content: error || "Lỗi không xác định", open: true } };
      });
  };
};
export const startLogout = (userId, history) => {
  return (dispatch) => {
    dispatch(logout());
    history.push('/');
    dispatch(clearInfo());
    WSSubject.logOut(userId);
  }
}
