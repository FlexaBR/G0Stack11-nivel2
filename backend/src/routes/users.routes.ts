import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;
    // para não retornar a senha depois de criado (ex. não aparece no Insomnia)

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
  return response.json({ ok: true });
});
// normalmente usa-se o patch no lugar do put quando é para atualizar uma
// única informação
export default usersRouter;
