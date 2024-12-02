import { Router } from 'express';
import { LibrarianRoute } from '../modules/librarian/librarian.route';
import { UserRoutes } from '../modules/user/user.route';
import { BookRoutes } from '../modules/book/book.route';
import { LibraryVanRoute } from '../modules/libraryVan/libraryVan.route';
import { CategoryRoute } from '../modules/category/category.route';
import { AdminRoute } from '../modules/admin/admin.route';
import { CustomerRoute } from '../modules/customer/customer.route';

type TModuleRoute = {
  path: string;
  route: any;
};
const router = Router();

const moduleRoutes: TModuleRoute[] = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/librarian',
    route: LibrarianRoute,
  },
  {
    path: '/admin',
    route: AdminRoute,
  },

  {
    path: '/customer',
    route: CustomerRoute,
  },
  {
    path: '/book',
    route: BookRoutes,
  },
  {
    path: '/library-van',
    route: LibraryVanRoute,
  },
  {
    path: '/category',
    route: CategoryRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
