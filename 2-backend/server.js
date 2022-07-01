import express from "express";
import { auth } from 'express-oauth2-jwt-bearer';
import { requiredScopes } from 'express-oauth2-jwt-bearer';
import 'dotenv/config'

const app = express();
const port = 5000;


// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'http://localhost:5000',
  issuerBaseURL: `https://dev-z0ga774h.us.auth0.com/`,
});


// This route doesn't need authentication
app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});


// This route needs authentication and authorisation as it is privately scoped
const checkScopes = requiredScopes('read:messages');

app.get('/api/private-scoped', checkJwt, checkScopes, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
  });
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
