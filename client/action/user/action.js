import { INIT_INFO, UPDATE_INFO, CLEAR_INFO } from "./type";
import Axios from "axios";
export const initInfo = ({name, email}) => ({
  type: INIT_INFO,
  payload: { name, email },
});

export const updateInfo = (property, newData) => ({
  type: UPDATE_INFO,
  payload: { property, newData },
});

export const clearInfo = () => ({
  type: CLEAR_INFO,
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
        dispatch(initInfo({name: user.name, email: user.email}));
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
};
