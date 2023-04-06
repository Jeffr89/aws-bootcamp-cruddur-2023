const { CognitoJwtVerifier } = require("aws-jwt-verify");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 9001;

app.use(bodyParser.json());

// require('dotenv').config();
// Create the verifier outside your route handlers,
// so the cache is persisted and can be shared amongst them.
const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.REACT_APP_AWS_USER_POOLS_ID,
  tokenUse: "access",
  clientId: process.env.REACT_APP_CLIENT_ID,
});




app.get("/", async (req, res, next) => {
  try {
    console.log("CHIAMATA GET")
    // A valid JWT is expected in the HTTP header "authorization"
    console.log(req.header)
    await jwtVerifier.verify(req.header("authorization"));
  } catch (err) {
    console.error(err);
    return res.status(403).json({ statusCode: 403, message: err});
  }
  return res.json({ private: "only visible to users sending a valid JWT" });
});

app.post('/verify-jwt', async (req, res) => {
    try {
      const token = req.body.token;
      console.log(token);
      await jwtVerifier.verify(token);
      return resizeTo.status(200).send("SEMBRA OK");
    //   res.json(claims);
    } catch (error) {
      return res.status(401).send(error.message);
    }
    return res.json({ private: "only visible to users sending a valid JWT" });
    
  });

// Hydrate the JWT verifier, then start express.
// Hydrating the verifier makes sure the JWKS is loaded into the JWT verifier,
// so it can verify JWTs immediately without any latency.
// (Alternatively, just start express, the JWKS will be downloaded when the first JWT is being verified then)
jwtVerifier
  .hydrate()
  .catch((err) => {
    console.error(`Failed to hydrate JWT verifier: ${err}`);
    process.exit(1);
  })
  .then(() =>
    app.listen(port,  () => {
      console.log(`Example app listening at http://localhost:${port}`);
    })
  );