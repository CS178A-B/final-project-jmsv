import { Router } from 'express';
import sampleRouter from './sample';
import jobRouter from './job';
import facultyMemberRouter from './facultyMember';
import userRouter from './user';
// Init router and path
const router = Router();

// Add sub-routes
router.use('/sample', sampleRouter);
router.use('/job', jobRouter);
router.use('/facultyMemberProfile', facultyMemberRouter);
router.use('/user', userRouter);
// Export the base-router
export default router;
