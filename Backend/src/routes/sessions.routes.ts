import { Router } from 'express';
import AuthenticateUser from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUser();

  const individuo = await authenticateUser.execute({
    email,
    password,
  });
  if (individuo?.user) {
    delete individuo.user.password;
  } else if (individuo?.driver) {
    delete individuo.driver.password;
  }

  return response.json(individuo);
});

export default sessionRouter;
