import express from 'express';
import { contactController, contactFormController } from '../controllers/contactController.js';
import { isAdmin, requiredSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post( '/send-message', contactFormController )
router.get( "/all-messages", requiredSignIn, isAdmin, contactController );

export default router;
