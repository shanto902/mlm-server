export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'librarian' | 'customer';
  isDeleted: boolean;
  status: 'in-progress' | 'blocked';
};
