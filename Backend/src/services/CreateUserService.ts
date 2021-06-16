import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  cpf: string;
}
class CreateUserService {
  public async execute({ name, email, password, cpf }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkEmailUserExists = await userRepository.findOne({
      where: { email },
    });
    const checkCpfUserExists = await userRepository.findOne({
      where: { cpf },
    });

    if (checkEmailUserExists) {
      throw new AppError('Email addres already used');
    } else if (checkCpfUserExists) {
      throw new AppError('CPF already used');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
    });
    await userRepository.save(user);
    return user;
  }
}
export default CreateUserService;
