import middleware from '@blocklet/sdk/lib/middlewares';
import { Router } from 'express';

import Result from '../libs/result';
import { User } from '../libs/types';
import userService from '../services/userService';

const router = Router();

router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.get('/account', async (_, res) => {
  try {
    //TODO:当前用户校验
    const result = await userService.getUserInfo(1);
    res.json(Result.success(result));
  } catch (error) {
    res.json(Result.fail(error));
  }
});

router.post('/account', async (req, res) => {
  try {
    //TODO:当前用户校验
    const { id, ...user } = req.body as User;
    const result = await userService.updateUserInfo(1, user);
    res.json(Result.success(result));
  } catch (error) {
    res.json(Result.fail(error));
  }
});

export default router;
