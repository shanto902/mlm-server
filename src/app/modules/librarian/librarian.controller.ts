/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express';
import { LibrarianServices } from './librarian.service';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../../utils/sendResponse';

const getAllLibrarians = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await LibrarianServices.getAllLibrariansFromDB();

    res.status(200).json({
      success: true,
      message: 'Librarians retrieved successfully',
      data: result,
    });

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Librarians retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleLibrarian = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { librarianId } = req.params;
    const result =
      await LibrarianServices.getSingleLibrarianFromDB(librarianId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Librarian retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const deleteLibrarian = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { librarianId } = req.params;
    const result = await LibrarianServices.deleteLibrarianFromDB(librarianId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Librarian Deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const LibrarianController = {
  getAllLibrarians,
  getSingleLibrarian,
  deleteLibrarian,
};
