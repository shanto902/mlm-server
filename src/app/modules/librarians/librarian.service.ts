import { TLibrarian } from './librarian.interface';
import { LibrarianModel } from './librarian.model';

const createLibrarianIntoDB = async (librarian: TLibrarian) => {
  if (await LibrarianModel.isUserExist(librarian.id)) {
    throw new Error('Librarian Already Exists');
  }

  const result = await LibrarianModel.create(librarian);

  return result;
};

const getAllLibrariansFromDB = async () => {
  const result = await LibrarianModel.find();
  return result;
};

const getSingleLibrarianFromDB = async (id: string) => {
  const result = await LibrarianModel.find({ id });
  return result;
};

const deleteLibrarianFromDB = async (id: string) => {
  const result = await LibrarianModel.updateOne(
    { id: id },
    { isDeleted: true },
  );
  return result;
};
export const LibrarianServices = {
  createLibrarianIntoDB,
  getAllLibrariansFromDB,
  getSingleLibrarianFromDB,
  deleteLibrarianFromDB,
};
