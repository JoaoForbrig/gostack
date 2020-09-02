import { Router, request, response } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload'

import CreateUsersService from '../services/CreateUsersService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);


usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUsersService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async(request, response) => {
    try{
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
          user_id: request.user.id,
          avatarFilename: request.file.filename,
        });

      delete user.password;

      return response.json(user)
    } catch (err) {
      return response.status(400).json({ error: err.message })
    }
},
)

export default usersRouter;
