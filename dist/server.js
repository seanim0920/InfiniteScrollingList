const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'ZKx9RYZHJbibHJm1vVrmr1HbcwShZHAlRT2NXaJuAg3iPVZAR4mLekilH7Nni02y',
  baseURL: 'https://infinitescrollinglist.herokuapp.com',
  clientID: 'ZxIL6jgOmmp2zceJIBjBkcbEpf7g7eqx',
  issuerBaseURL: 'https://dry-wind-8885.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.sendFile(req.oidc.isAuthenticated() ? path.resolve(__dirname, 'app.html') : path.resolve(__dirname, 'index.html'));
});

app.listen(port);