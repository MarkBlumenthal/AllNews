// src/routes/getComments.ts
// import { Router } from 'express';
// import { addComment, getComments } from '../controllers/commentsController';
// import authMiddleware from '../middleware/auth';

// const router = Router();

// router.post('/', authMiddleware, addComment);
// router.get('/:articleId', getComments);

// export default router;




import { Router } from 'express';
import { addComment, getComments } from '../controllers/commentsController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/', authMiddleware, addComment);
router.get('/:articleId', getComments);

export default router;

