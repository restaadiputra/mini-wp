const { OAuth2Client } = require('google-auth-library');
const clientID = process.env.GCLIENT_ID;
const client = new OAuth2Client(clientID);

module.exports = {
  googleAuth(token) {
    return client.verifyIdToken({
      idToken: token,
      audience: clientID
    })
  }
}