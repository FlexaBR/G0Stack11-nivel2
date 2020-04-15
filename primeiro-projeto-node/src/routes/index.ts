import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
// toda rota que chegar com '/appointments' irá para appointmentsRouter
// enviia para appointmentsRouter o que vier depois de /appointments

export default routes;
