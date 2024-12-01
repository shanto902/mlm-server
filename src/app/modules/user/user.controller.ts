import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createLibrarian = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, librarian: librarianData } = req.body;
    //   const zodParsedLibrarianData =
    //     librarianValidationSchema.parse(librarianData);
    const result = await UserServices.createLibrarianIntoDB(
      password,
      librarianData,
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: 'Librarian created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    next(error);
  }
};

export const UserControllers = {
  createLibrarian,
};
