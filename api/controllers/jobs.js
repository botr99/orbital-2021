import Job from "../models/Job.js";
import paginateQuery from "../middleware/paginateQuery/paginateQuery.js";
import { ADMIN_EMAIL, sendEmail } from "../utils/mailer/mailer.js";

export const getCategories = async (req, res) => {
  try {
    // returns an array of all the enum values
    // of the category field in the Job model
    const categories = await Job.schema.path("categories").caster.enumValues;
    res.status(200).json(categories);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getJobsOrganized = async (req, res) => {
  try {
    const jobsOrganized = await Job.find({
      organizer: req.params.name,
      isApproved: true,
    }).sort({ createdAt: "desc" });

    res.status(200).json(jobsOrganized);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getApprovedJobs = (req, res) => {
  const searchQuery = req.query.search
    ? {
        // find all titles or organizers that contain the search query
        $or: [
          { title: { $regex: req.query.search.trim(), $options: "i" } },
          { organizer: { $regex: req.query.search.trim(), $options: "i" } },
        ],
      }
    : {};

  const categoriesQuery = req.query.categories
    ? { categories: { $in: req.query.categories.split(",") } }
    : {};

  const filters = {
    $and: [searchQuery, categoriesQuery, { isApproved: true }],
  };

  const sort = { createdAt: "desc" };

  return paginateQuery(req, res, Job, filters, sort);
};

export const getUnapprovedJobs = (req, res) => {
  const searchQuery = req.query.search
    ? {
        // find all titles or organizers that contain the search query
        $or: [
          { title: { $regex: req.query.search.trim(), $options: "i" } },
          { organizer: { $regex: req.query.search.trim(), $options: "i" } },
        ],
      }
    : {};

  const categoriesQuery = req.query.categories
    ? { categories: { $in: req.query.categories.split(",") } }
    : {};

  const filters = {
    $and: [searchQuery, categoriesQuery, { isApproved: false }],
  };

  return paginateQuery(req, res, Job, filters);
};

export const getJobRegistrations = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "registrations",
      "name contactNum email" // only retrieve certain fields
    );
    res.status(200).json(job.registrations);
  } catch (err) {
    res.status(404).json({ message: "Job not found" });
  }
};
/* Example of a response.
[
    {
        "_id": """ student1's id """,
        "name": "student1",
        "contactNum": 12345678,
        "email": "student1@gmail.com"
    },
    {
        "_id": """ student2's id """,
        "name": "student2",
        "contactNum": 87654321,
        "email": "student2@gmail.com"
    }
]
*/

export const getJobDetail = (req, res) => res.status(200).json(req.jobDetail);

export const postJobRegistration = async (req, res) => {
  // console.log("Students allowed here only");
  try {
    const studentId = req.user.id;
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { registrations: studentId } },
      {
        new: true,
      }
    );

    const subject = `Registered interest for "${updatedJob.title}"`;
    // replace with http://localhost:3000 in dev
    const mailContent = `
      <p>This is to confirm that you have registered your interest for the job shown 
        <a href="https://nus-ccsgp.netlify.app/jobs/${req.params.id}">
          here.
        </a>
      </p>
      <p>
        Do note that your contact details have been provided to the job organizer, and you will be contacted
        by them for more information regarding the job once registrations are filled up.
      </p>
    `;
    sendEmail(ADMIN_EMAIL, req.user.email, subject, mailContent);

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteJobRegistration = async (req, res) => {
  // console.log("Students allowed here only");
  try {
    const studentId = req.user.id;
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $pull: { registrations: studentId } },
      {
        new: true,
      }
    );

    const subject = "Unregistered interest for a job";
    // replace with http://localhost:3000 in dev
    const mailContent = `
      <p>This is to confirm that you have unregistered your interest for the job shown 
        <a href="https://nus-ccsgp.netlify.app/jobs/${req.params.id}">
          here.
        </a>
      </p>
    `;
    sendEmail(ADMIN_EMAIL, req.user.email, subject, mailContent);

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const postJob = async (req, res) => {
  const newJob = new Job({ ...req.body });
  // console.log(newJob);
  try {
    await newJob.save();

    const subject = "Job successfully created";
    const mailContent = `
      <p>This is to confirm that your job, titled "${req.body.title}", has been created.</p>
      <p>The job is now being reviewed by the admin. Once the admin approves your job, your job will be on the home page 
      and an email will be sent to notify you.</p>
    `;
    sendEmail(ADMIN_EMAIL, req.body.email, subject, mailContent);

    res.status(201).json(newJob);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const approveJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      {
        new: true,
      }
    );

    const jobEmail = updatedJob.email;
    const subject = `"${updatedJob.title}" is now public`;
    // replace with http://localhost:3000 in dev
    const mailContent = `
        <p>This is to confirm that your job, ${updatedJob.title}, has been approved.</p>
        <p>You can view your job at this link: 
          <a href="https://nus-ccsgp.netlify.app/jobs/${req.params.id}">
            https://nus-ccsgp.netlify.app/jobs/${req.params.id}
          </a>.
        </p>
        <p>Do note that you have to be logged in to make changes to your job and see the list of students that have
        registered for your job.
        </p>
      `;
    sendEmail(ADMIN_EMAIL, jobEmail, subject, mailContent);

    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const unapproveJob = async (req, res) => {
  const feedbackData = req.body;

  try {
    const reportedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { isApproved: false },
      {
        new: true,
      }
    );

    const jobEmail = reportedJob.email;
    const subjectToOrganizer = `"${reportedJob.title}" has been suspended temporarily`;
    const mailContentToOrganizer = `
          <p>This is to inform you that your job, ${reportedJob.title}, has been temporarily suspended due to a report made against it.</p>
          <p>Investigations are ongoing and our admins will be contacting you shortly for further actions.
          </p>
        `;
    sendEmail(
      ADMIN_EMAIL,
      jobEmail,
      subjectToOrganizer,
      mailContentToOrganizer
    );

    const subjectToAdmin = `Report made against "${reportedJob.title}"`;
    const mailContentToAdmin = `
      <p>${reportedJob.title}, organized by ${reportedJob.organizer}, has been temporarily suspended due to a report made against it.</p>
      <p>Email of complainant: ${feedbackData.email}</p>
      <p>Feedback: ${feedbackData.feedback}</p>
      <p>You can view the reported job at this link:
        <a href="https://nus-ccsgp.netlify.app/submissions/${req.params.id}">
           https://nus-ccsgp.netlify.app/submissions/${req.params.id}
         </a>.
      </p>
    `;
    sendEmail(ADMIN_EMAIL, ADMIN_EMAIL, subjectToAdmin, mailContentToAdmin);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    res.status(204).json(deletedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const rejectJob = async (req, res) => {
  const { reason } = req.body;
  try {
    const rejectedJob = await Job.findByIdAndDelete(req.params.id);

    const jobEmail = rejectedJob.email;
    const subject = `"${rejectedJob.title}" has been rejected`;
    const mailContent = `
          <p>This is to inform you that your job, ${rejectedJob.title}, has been rejected due to the following reason(s):</p>
          <p>${reason}</p>
        `;
    sendEmail(ADMIN_EMAIL, jobEmail, subject, mailContent);

    res.status(204).json(rejectedJob);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
