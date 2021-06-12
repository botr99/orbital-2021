import express from 'express';
import {
  getCategories,
  getJobs,
  getJobDetail,
  postJob,
  updateJob,
  deleteJob,
} from '../../controllers/jobs.js';
import { validateJob } from '../../middleware/validateJob.js';
import checkAuth from '../../middleware/checkAuth.js';

const router = express.Router();

// const { jobSchema, registrationSchema } = require("../../schemas");
// const { categories, organizations } = require("../../seeds/seedHelpers"); // To provide default categories

// order of the routes matter, if this route
// comes after /:id route, then the :id could be
// matched to categories, causing an error.
router.get('/categories', getCategories);

router.get('/', getJobs);

router.get('/:id', getJobDetail);

router.post('/', checkAuth, validateJob, postJob);

router.patch('/:id', checkAuth, validateJob, updateJob);

router.delete('/:id', checkAuth, deleteJob);

export default router;
