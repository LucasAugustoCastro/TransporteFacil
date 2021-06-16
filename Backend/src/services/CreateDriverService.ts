import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';
import Driver from '../models/Driver';

interface Request {
  name: string;
  email: string;
  password: string;
  cpf: string;
  nCNH: string;
}
class CreateDriverService {
  public async execute({
    name,
    email,
    password,
    cpf,
    nCNH,
  }: Request): Promise<Driver> {
    const driverRepository = getRepository(Driver);

    const checkEmailUserExists = await driverRepository.findOne({
      where: { email },
    });
    const checkCpfUserExists = await driverRepository.findOne({
      where: { cpf },
    });
    const checkNCNHfUserExists = await driverRepository.findOne({
      where: { nCNH },
    });

    if (checkEmailUserExists) {
      throw new AppError('Email addres already used');
    } else if (checkCpfUserExists) {
      throw new AppError('CPF already used');
    } else if (checkNCNHfUserExists) {
      throw new AppError('Number os CNH already used');
    }

    const hashedPassword = await hash(password, 8);

    const driver = driverRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      nCNH,
    });
    await driverRepository.save(driver);
    return driver;
  }
}
export default CreateDriverService;
