import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { LibraryVanValidations } from './libraryVan.validation';
import { LibraryVanControllers } from './libraryVan.controller';

const router = express.Router();

router.post(
  '/add-van',
  validateRequest(LibraryVanValidations.createLibraryVanValidationSchema),
  LibraryVanControllers.addLibraryVan,
);
router.get('/', LibraryVanControllers.getAllVans);
// router.get('/:vanId', LibrarianController.deleteLibrarian);
// router.get('/:vanId', LibrarianController.deleteLibrarian);
// router.post('/updateLocation');

export const LibraryVanRoute = router;
