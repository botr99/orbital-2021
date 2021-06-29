import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../.env" });

const secret = process.env.SECRET;

const assignUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedData = jwt.verify(token, `${secret}`);

    req.user = decodedData;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token expired" });
  }
};

export default assignUser;
