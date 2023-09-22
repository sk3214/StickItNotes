import express from 'express';
import {getNotes,createNotes, getNote, updateNote, deleteNote} from '../controllers/notes';

const router = express.Router();
router.get('/',getNotes);
router.get('/:noteId',getNote);
router.post('/',createNotes);
router.patch('/:noteId',updateNote)
router.delete('/:noteId',deleteNote)

export default router;