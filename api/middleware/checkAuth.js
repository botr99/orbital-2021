import jwt from 'jsonwebtoken';

const secret = 'test';

const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split('')[1];
    let decodedData;

    if (token) {
      // Token found, user is authenticated
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export default checkAuth;
