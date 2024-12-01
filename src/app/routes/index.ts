import { Router } from 'express';
import { LibrarianRoute } from '../modules/librarian/librarian.route';
import { UserRoutes } from '../modules/user/user.route';

type TModuleRoute = {
  path: string;
  route: any;
};
const router = Router();

const moduleRoutes: TModuleRoute[] = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/librarian',
    route: LibrarianRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
