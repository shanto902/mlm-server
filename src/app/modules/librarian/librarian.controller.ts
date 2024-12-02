import { LibrarianServices } from './librarian.service';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../utils/sendResponse';
import catchAsync from '../../../utils/catchAsync';

const getAllLibrarians = catchAsync(async (req, res) => {
  const result = await LibrarianServices.getAllLibrariansFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Librarians retrieved successfully',
    data: result,
  });
});

const getSingleLibrarian = catchAsync(async (req, res) => {
  const { librarianId } = req.params;
  const result = await LibrarianServices.getSingleLibrarianFromDB(librarianId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Librarian retrieved successfully',
    data: result,
  });
});

const deleteLibrarian = catchAsync(async (req, res) => {
  const { librarianId } = req.params;
  const result = await LibrarianServices.deleteLibrarianFromDB(librarianId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Librarian Deleted successfully',
    data: result,
  });
});

export const LibrarianController = {
  getAllLibrarians,
  getSingleLibrarian,
  deleteLibrarian,
};