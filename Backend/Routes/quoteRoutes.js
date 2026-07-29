import express from 'express';
import { submitQuote } from '../Controllers/quoteController.js';

const router = express.Router();

router.post('/', submitQuote);

export default router;