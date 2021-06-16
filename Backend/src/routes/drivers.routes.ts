import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateDriverService from '../services/CreateDriverService';
import Driver from '../models/Driver';
import Regiao from '../models/Regiao';

const driverRouter = Router();

driverRouter.get('/', async (request, response) => {
  const driverRepository = getRepository(Driver);
  const drivers = await driverRepository.find();
  drivers.forEach(driver => {
    delete driver.password;
  });
  return response.json({ drivers });
});

driverRouter.post('/', async (request, response) => {
  try {
    const { name, cpf, email, password, nCNH } = request.body;

    const createDriver = new CreateDriverService();

    const driver = await createDriver.execute({
      name,
      email,
      password,
      cpf,
      nCNH,
    });

    delete driver.password;
    return response.json(driver);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
driverRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const driverRepository = getRepository(Driver);
  const regioesRepository = getRepository(Regiao);
  const driver = await driverRepository.findOne(id);
  const regioes = await regioesRepository.find({ where: { driver_id: id } });
  delete driver?.password;
  return response.json({ driver, regioes });
});

export default driverRouter;
