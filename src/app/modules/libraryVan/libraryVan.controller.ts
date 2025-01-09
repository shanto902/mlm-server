import { StatusCodes } from 'http-status-codes';

import { LibraryVanServices } from './libraryVan.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';

const addLibraryVan: RequestHandler = catchAsync(async (req, res) => {
  const result = await LibraryVanServices.addLibraryVanIntoDb(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'Library Van added successfully',
    data: result,
  });
});

const getAllVans: RequestHandler = catchAsync(async (req, res) => {
  const libraryVanData = await LibraryVanServices.getAllVansFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Library Van retrived Successfully',
    data: libraryVanData,
  });
});

export const LibraryVanControllers = {
  addLibraryVan,
  getAllVans,
};
