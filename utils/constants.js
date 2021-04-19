module.exports = {
  jwtDevSecret: 'dev-secret',
  jwtEnableDuration: '7d',
  authSchema: 'Bearer ',
  productionEnvKeyWord: 'production',
  mongoDBDefaultURI: 'mongodb://localhost:27017/bitfilmsdb',

  authNeededErrorMessage: 'Необходима авторизация',
  serverInternalErrorMessage: 'На сервере произошла ошибка',
  // userNotFoundErrorMessage: 'Пользователь не найден',
  notFoundErrorMessage: 'Запрашиваемый ресурс не найден',
  mailBeenUsedErrorMessage: 'Пользователь с такой почтой уже существует',
  incorrectEmailOrPasswordErrorMessage: 'Неправильные почта или пароль',
  // notFoundByIdErrorMessage: 'Не удалось найти фильм с таким id',
  incorrectIdErrorMessage: 'Введен не корректный идентификатор',
  wrongEmailFormatMessage: 'Неверный формат почты',
  wrongURLFormatMessage: 'Неверный формат ссылки',

  userCreatedMessage: 'Пользователь создан',
  movieCreatedMessage: 'Создана новая запись о фильме',
  movieDeletedMessage: 'Запись о фильме удалена',
  permissionDeniedErrorMessage: 'Недостаточно прав',

  mongoUniqueFieldDuplicatedError: 11000,
  mongoIdIncorrectErrorCode: 'ObjectId',
};
