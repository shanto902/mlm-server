import express from 'express';
import { LibrarianController } from './librarian.controller';

const router = express.Router();

router.post('/create-librarian', LibrarianController.createLibrarian);
router.get('/librarians', LibrarianController.getAllLibrarians);
router.get('/:librarianId', LibrarianController.getSingleLibrarian);
router.delete('/:librarianId', LibrarianController.deleteLibrarian);

export const LibrarianRoute = router;
