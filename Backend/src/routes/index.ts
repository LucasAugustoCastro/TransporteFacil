import { Router } from 'express';
import userRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import driverRouter from './drivers.routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/drivers', driverRouter);

export default routes;
