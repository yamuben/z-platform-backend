import { Router } from 'express';
import user from './userRoutes';


const router = Router();
router.use('/api/v1/user', user);

export default router;