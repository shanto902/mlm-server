import { TLibraryVan } from './libraryVan.interface';
import { LibraryVanModel } from './libraryVan.model';

const addLibraryVanIntoDb = async (payload: TLibraryVan) => {
  // add a book into db

  const newVan = await LibraryVanModel.create(payload);
  return newVan;
};

export const LibraryVanServices = {
  addLibraryVanIntoDb,
};
