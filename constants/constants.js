const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_AUTH = 401;
const STATUS_FORBIDDEN = 403;
const STATUS_NOT_FOUND = 404;
const STATUS_CONFLICT = 409;
const STATUS_DEFAULT_ERROR = 500;

const INCORRECT_DATA = 'Переданы некорректные данные';
const CARD_NOT_FOUND = 'Карточка не найдена';
const PROHIBITION_DEL_CARD = 'Нельзя удалять карточки других пользователей';
const USER_NOT_FOUND = 'Карточка не найдена';
const EXIST_EMAIL = 'Пользователь с таким Email уже существует';
const REQUIRED_AUTH = 'Необходима авторизация';
const PAGE_NOT_FOUND = 'Страница не найдена';
const DEFAULT_ERROR = 'Произошла ошибка';

module.exports = {
  STATUS_OK,
  STATUS_CREATED,
  STATUS_BAD_REQUEST,
  STATUS_NOT_AUTH,
  STATUS_FORBIDDEN,
  STATUS_NOT_FOUND,
  STATUS_CONFLICT,
  STATUS_DEFAULT_ERROR,
  INCORRECT_DATA,
  CARD_NOT_FOUND,
  PROHIBITION_DEL_CARD,
  USER_NOT_FOUND,
  EXIST_EMAIL,
  REQUIRED_AUTH,
  PAGE_NOT_FOUND,
  DEFAULT_ERROR,
};
