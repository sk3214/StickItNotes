import express from 'express';
import {getNotes,createNotes, getNote} from '../controllers/notes';

const router = express.Router();
router.get('/',getNotes);
router.get('/:noteId',getNote);
router.post('/',createNotes);

export default router;