import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';
import authConfig from '../config/auth';

import User from '../models/User';
import Driver from '../models/Driver';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user?: User;
  driver?: Driver;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: Request): Promise<Response | undefined> {
    const userRepository = getRepository(User);
    const driverRepository = getRepository(Driver);
    const user = await userRepository.findOne({ where: { email } });
    const driver = await driverRepository.findOne({ where: { email } });

    if (!user && !driver) {
      throw new AppError('Incorrect email/password');
    }
    if (user) {
      const passwordMatched = await compare(password, user.password);

      if (!passwordMatched) {
        throw new AppError('Incorrect email/password');
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: user.id,
        expiresIn,
      });

      return { user, token };
    }
    if (driver) {
      const passwordMatched = await compare(password, driver.password);

      if (!passwordMatched) {
        throw new AppError('Incorrect email/password');
      }

      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: driver.id,
        expiresIn,
      });

      return { driver, token };
    }
    return undefined;
  }
}

export default AuthenticateUserService;
