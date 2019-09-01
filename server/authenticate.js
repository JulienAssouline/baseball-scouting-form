const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const authenticate = (app, req) => {
  try {
    const jwtCookie = req.cookies.blackcreek_app;
    const verified_information = jwt.verify(jwtCookie, "secret")
    return verified_information.id;
  } catch(e) {
    throw e.message;
  }


}

module.exports = authenticate

