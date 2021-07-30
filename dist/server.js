const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: true,
  auth0Logout: true,
  secret: '5R6YsGKhqs02uGdSsHuPv0wjncy603vz-j6Y_ffRVhkEiWNLUT3QpDYEQ2pUhdCU',
  baseURL: 'https://infinitescrollinglist.herokuapp.com/',
  clientID: 'jywbGrzbqFNlZ1H90I33WCBXkUaMKESF',
  issuerBaseURL: 'https://dev-bsator0c.us.auth0.com'
};

app.use(auth(config));

app.get('*', requiresAuth(), (req, res) => {
  res.sendFile(path.resolve(__dirname, 'app.html'));
});

app.listen(port);