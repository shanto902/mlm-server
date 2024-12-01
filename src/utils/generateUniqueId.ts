import { UserModel } from '../app/modules/user/user.model';

const generateUniqueId = async (role: string): Promise<string> => {
  // Extract the role prefix (first two letters, uppercase)
  const rolePrefix = role.substring(0, 2).toUpperCase();

  // Find the last user with the same role, sorted by creation time
  const lastUser = await UserModel.findOne(
    { role }, // Filter by role
    { id: 1, _id: 0 }, // Only fetch the `id` field
  )
    .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
    .lean(); // Optimize query by returning a plain JS object

  // Extract the numeric part from the ID, or default to 0
  const lastIdNumber = lastUser?.id
    ? parseInt(lastUser.id.substring(3), 10)
    : 0;

  // Increment the numeric part and format it as two digits
  const newIdNumber = (lastIdNumber + 1).toString().padStart(2, '0');

  // Construct the new ID
  return `${rolePrefix}-${newIdNumber}`;
};

export default generateUniqueId;
