import { Router } from 'express';
import { LibrarianRoute } from '../modules/librarian/librarian.route';
import { UserRoutes } from '../modules/user/user.route';
import { BookRoutes } from '../modules/book/book.route';
import { LibraryVanRoute } from '../modules/libraryVan/libraryVan.route';
import { CategoryRoute } from '../modules/category/category.route';
import { AdminRoute } from '../modules/admin/admin.route';
import { MemberRoute } from '../modules/member/member.route';
import { AuthRouter } from '../modules/auth/auth.route';

type TModuleRoute = {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route: any;
};
const router = Router();

const moduleRoutes: TModuleRoute[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/librarians',
    route: LibrarianRoute,
  },
  {
    path: '/admins',
    route: AdminRoute,
  },

  {
    path: '/members',
    route: MemberRoute,
  },
  {
    path: '/books',
    route: BookRoutes,
  },
  {
    path: '/library-vans',
    route: LibraryVanRoute,
  },
  {
    path: '/categories',
    route: CategoryRoute,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
