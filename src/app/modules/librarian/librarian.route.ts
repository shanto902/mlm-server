import express from 'express';
import { LibrarianController } from './librarian.controller';

const router = express.Router();

router.get('/', LibrarianController.getAllLibrarians);
router.get('/:librarianId', LibrarianController.getSingleLibrarian);
router.delete('/:librarianId', LibrarianController.deleteLibrarian);

export const LibrarianRoute = router;