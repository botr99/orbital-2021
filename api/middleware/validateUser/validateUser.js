import ROLES from "../../utils/roles.js";

const validateUser = (req, res, next) => {
  if (req.user?.role === ROLES.Admin || req.user?.id === req.params.id) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized access" });
};

export default validateUser;
