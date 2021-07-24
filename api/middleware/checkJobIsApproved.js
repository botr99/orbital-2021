import Job from "../models/Job.js";
import ROLES from "../utils/roles.js";

const checkJobIsApproved = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    if (job.isApproved || req.user?.role === ROLES.Admin) {
      // admin can read/update/delete any approved/unapproved jobs
      req.jobDetail = job;
      return next();
    }

    // console.log("Not admin");

    // prevent unapproved job id from leaking out to
    // other user roles
    res.status(404).json({ message: "Job not found" });
  } catch (err) {
    res.status(404).json({ message: "Job not found" });
  }
};

export default checkJobIsApproved;
