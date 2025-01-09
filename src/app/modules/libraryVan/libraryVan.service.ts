import { TLibraryVan } from './libraryVan.interface';
import { LibraryVanModel } from './libraryVan.model';

const addLibraryVanIntoDb = async (payload: TLibraryVan) => {
  // add a book into db

  const newVan = await LibraryVanModel.create(payload);
  return newVan;
};

const getAllVansFromDB = async () => {
  const result = await LibraryVanModel.find();
  return result;
};

export const LibraryVanServices = {
  addLibraryVanIntoDb,
  getAllVansFromDB,
};
