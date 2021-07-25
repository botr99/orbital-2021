import ROLES from "../../utils/roles.js";

const validateOrganizer = (req, res, next) => {
  if (
    req.user &&
    (req.user?.role === ROLES.Admin ||
      req.user?.name === req.jobDetail?.organizer)
  ) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized access" });
};

export default validateOrganizer;
