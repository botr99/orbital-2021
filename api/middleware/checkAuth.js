// permissions array to restrict access to certain roles
const checkAuth = (permissions) => async (req, res, next) => {
  if (
    !(
      Array.isArray(permissions) &&
      req.user &&
      permissions.includes(req.user.role)
    )
  ) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
  next();
};

export default checkAuth;
