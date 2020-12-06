import {LOGIN, LOGOUT} from './type';
import Axios from 'axios';
import * as queryString from 'query-string';
export const login = (id, token) => ({
  type: LOGIN,
  payload: {id, token}
});

export const logout = () => ({
  type: LOGOUT
});

export const getFacebookUrl = () => {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.FB_APP_ID,
      redirect_uri: process.env.FB_REDIRECT_URL,
      scope: 'email', // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
      display: 'popup',
    });
    return `https://www.facebook.com/v8.0/dialog/oauth?${stringifiedParams}`;
}

export const getGoogleUrl = () => {
    return Axios.get('/google/url')
    .then((res) => {
      return res.data;
    })
    .catch((e) =>{
      console.log(e);
    });
}
export const startLogin = (email, password, setError) => {
    return (dispatch, getState) => {
        Axios.post('/api/users/login', {email, password})
        .then((res) => {
            const {user, token} = res.data;
            dispatch(login(user._id, token));
        })
        .catch((e) => {
          console.log(e);
          const error = e.response && e.response.data && e.response.data.error;
          setError(error || e.response.statusText);
        });
    }
}
export const startLoginThirdParty = (path, code, history) => {
    return (dispatch, getState) => {
        Axios.post(`/api/users/login${path}`, {code})
        .then((res) => {
            const {user, token} = res.data;
            dispatch(login(user._id, token));
            history.push('/')
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
}
export const startSignUp = (data, setError) => {
  return (dispatch, getState) => {
      Axios.post('/api/users/signup', {...data})
      .then((res) => {
          const {user, token} = res.data;
          dispatch(login(user._id, token));
      })
      .catch((e) => {
        const error = e.response && e.response.data && e.response.data.error;
        setError(error || e.response.statusText);
      });
  }
}