import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/appError';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized');
    }

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (error, decoded) {
        if (error) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'You are not Authorized',
          );
        }
        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;
