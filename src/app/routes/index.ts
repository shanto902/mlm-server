import { Router } from 'express';
import { LibrarianRoute } from '../modules/librarian/librarian.route';
import { UserRoutes } from '../modules/user/user.route';
import { BookRoutes } from '../modules/book/book.route';
import { LibraryVanRoute } from '../modules/libraryVan/libraryVan.route';
import { CategoryRoute } from '../modules/category/category.route';

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
