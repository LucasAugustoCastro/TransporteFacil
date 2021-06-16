import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';
import RotaService from '../services/RotaService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  try {
    const { name, cpf, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      cpf,
    });

    delete user.password;
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRouter.get('/regiao/:origem/:destino', async (request, response) => {
  const { origem, destino } = request.params;
  const rotaService = new RotaService();
  const regioes = await rotaService.execute({ origem, destino });

  regioes.forEach(regiao => delete regiao.driver.password);

  return response.json({ regioes });
});

export default userRouter;
