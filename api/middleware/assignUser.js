import jwt from "jsonwebtoken";

const secret = "test";

const assignUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedData = jwt.verify(token, secret);

    req.user = decodedData;

    // console.log(req.user);
    console.log("valid access");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Token expired" });
  }
};

export default assignUser;
