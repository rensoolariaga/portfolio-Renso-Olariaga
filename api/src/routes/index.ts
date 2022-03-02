import { Router } from 'express';
const router = Router();
import { sendMail, deletePhotoById, getMailById, getMails, helloWorld, updateMailById } from '../controllers/mailController';
// import multer from '../libs/multer';

router.get('/', helloWorld);
router.get('/mail', getMails);

// send multer.single('namePrefer') for only 1 image like middleware for the reception of the data
// router.post('/mail', multer.single('image'), sendMail);
router.post('/mail', sendMail);

router.get('/mail/:id', getMailById);
router.delete('/mail/:id', deletePhotoById);
router.put('/mail:id', updateMailById)

export default router;