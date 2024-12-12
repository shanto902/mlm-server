import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { MemberServices } from './member.service';
import { StatusCodes } from 'http-status-codes';

const getAllMembers = catchAsync(async (req, res) => {
  const result = await MemberServices.getAllMembersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Member retrieved successfully',
    data: result,
  });
});

const getSingleMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const result = await MemberServices.getSingleMemberFromDB(memberId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Member retrieved successfully',
    data: result,
  });
});

const deleteMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const result = await MemberServices.deleteMemberFromDB(memberId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Member Deleted successfully',
    data: result,
  });
});

const updateMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const { member: memberData } = req.body;
  const result = await MemberServices.updateMemberFromDB(memberId, memberData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Member Updated successfully',
    data: result,
  });
});

export const MemberControllers = {
  getAllMembers,
  getSingleMember,
  deleteMember,
  updateMember,
};
