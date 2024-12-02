import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { LibraryVanServices } from './libraryVan.service';

const addLibraryVan = catchAsync(async (req, res) => {
  const result = await LibraryVanServices.addLibraryVanIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Library Van added successfully',
    data: result,
  });
});

export const LibraryVanControllers = {
  addLibraryVan,
};
