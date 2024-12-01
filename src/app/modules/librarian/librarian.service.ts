import { LibrarianModel } from './librarian.model';

const getAllLibrariansFromDB = async () => {
  const result = await LibrarianModel.find();
  return result;
};

const getSingleLibrarianFromDB = async (id: string) => {
  const cleanedId = id.trim();
  const result = await LibrarianModel.findOne({ id: cleanedId });
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
  getAllLibrariansFromDB,
  getSingleLibrarianFromDB,
  deleteLibrarianFromDB,
};
