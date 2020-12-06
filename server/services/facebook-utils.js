const axios = require('axios');
require('dotenv').config();

const getAccessTokenFromCode = async (code) => {
    try{
        const { data } = await axios({
            url: 'https://graph.facebook.com/v8.0/oauth/access_token',
            method: 'get',
            params: {
              client_id: process.env.FB_APP_ID,
              client_secret: process.env.FB_APP_SECRET,
              redirect_uri: process.env.FB_REDIRECT_URL,
              code,
            },
          });
          return data.access_token;
    }
    catch(e) {
        console.log(e.response.data.error);
    }

};
const getFacebookUserData = async (code) => {
    try{
        const accessToken = await getAccessTokenFromCode(code);
        const { data } = await axios({
        url: 'https://graph.facebook.com/me',
        method: 'get',
        params: {
            fields: ['id', 'email', 'first_name', 'last_name'].join(','),
            access_token: accessToken,
        },
        });
        const { id, email, first_name, last_name } = data;
        return {password: id, email, name: first_name + ' ' + last_name};
    }
    catch(e) {
        console.log(e);
    }
};
module.exports = getFacebookUserData;