/* eslint-disable no-console */
import { Request, Response } from 'express';
import { LibrarianServices } from './librarian.service';
import librarianValidationSchema from './librarian.validation';

const createLibrarian = async (req: Request, res: Response) => {
  try {
    const { librarian: librarianData } = req.body;
    const zodParsedLibrarianData =
      librarianValidationSchema.parse(librarianData);
    const result = await LibrarianServices.createLibrarianIntoDB(
      zodParsedLibrarianData,
    );

    res.status(200).json({
      success: true,
      message: 'Librarian Created Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const getAllLibrarians = async (req: Request, res: Response) => {
  try {
    const result = await LibrarianServices.getAllLibrariansFromDB();

    res.status(200).json({
      success: true,
      message: 'Librarians retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleLibrarian = async (req: Request, res: Response) => {
  try {
    const { librarianId } = req.params;
    const result =
      await LibrarianServices.getSingleLibrarianFromDB(librarianId);

    res.status(200).json({
      success: true,
      message: 'Librarian retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

const deleteLibrarian = async (req: Request, res: Response) => {
  try {
    const { librarianId } = req.params;
    const result = await LibrarianServices.deleteLibrarianFromDB(librarianId);

    res.status(200).json({
      success: true,
      message: 'Librarian Deleted Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      data: error,
    });
  }
};

export const LibrarianController = {
  createLibrarian,
  getAllLibrarians,
  getSingleLibrarian,
  deleteLibrarian,
};
