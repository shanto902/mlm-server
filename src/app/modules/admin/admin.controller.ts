import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AdminServices } from './admin.service';

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admins retrieved successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(adminId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admin retrieved successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.deleteAdminFromDB(adminId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admin Deleted successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { adminId } = req.params;
  const { admin: adminData } = req.body;
  const result = await AdminServices.updateAdminFromDB(adminId, adminData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Admin Updated successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
  getSingleAdmin,
};
