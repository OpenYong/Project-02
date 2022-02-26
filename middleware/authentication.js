const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const reqHeader = req.get("Authorization");
  if (!reqHeader) {
    const error = new Error("인증 되지 않음");
    error.statuscode = 401;
    throw error;
  }
  const token = reqHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "signbyyong");
  } catch (error) {
    error.statuscode = 500;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("인증 되지 않음");
    error.statuscode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
