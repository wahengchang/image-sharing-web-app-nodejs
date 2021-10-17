// reference: 
// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
const jwt = require("jsonwebtoken");
const {AUTH_SECRET= 'randomPharse'} = require('../../config')

function getCookie(cname, wholeCookie) {
  let name = cname + "=";
  let ca = wholeCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
      c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
      }
  }
  return "";
}

const extractToken = (req) => {
  const extractBearer = () => {
    try {
      const bearerHeader = req.header('authorization')
      const bearer = bearerHeader.split(' ')
      return bearer[1]
    }
    catch(e) {
      return ''
    }
  }
  const extractCookie = () => {
    try {
      return getCookie("u",req.headers.cookie) || ''
    }
    catch(e) {
      return ''
    }
  }

  return extractBearer() || extractCookie ()
}

const requiredLogin = (req, res, next) => {
  const token = extractToken(req)
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, AUTH_SECRET);
    res.locals.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const signToken = (userItem) => {
    const {id, username} = userItem
    return jwt.sign(
        { id, username },
        AUTH_SECRET,
        {
          expiresIn: "2h",
        }
      );
}

module.exports = {
    requiredLogin,
    signToken
};