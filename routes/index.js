const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', userRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});