import jwt from "jsonwebtoken";

const secret = "test";

// permissions array to restrict access to certain roles
const checkAuth = (permissions) => async (req, res, next) => {
  if (!req.headers.authorization || !Array.isArray(permissions)) {
    // either not logged in or is modified to be removed
    console.log("not logged in");
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedData = jwt.verify(token, secret);
    const role = decodedData.role;

    if (!permissions.includes(role)) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    // req.userName = decodedData?.name;
    console.log("valid access");
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};
export default checkAuth;
