import { UserModel } from '../modules/user/user.model';

const generateUniqueId = async (role: string): Promise<string> => {
  const rolePrefix = role.substring(0, 2).toUpperCase();
  const lastUser = await UserModel.findOne({ role }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  const lastIdNumber = lastUser?.id
    ? parseInt(lastUser.id.substring(3), 10)
    : 0;
  const newIdNumber = (lastIdNumber + 1).toString().padStart(2, '0');
  return `${rolePrefix}-${newIdNumber}`;
};

export default generateUniqueId;
