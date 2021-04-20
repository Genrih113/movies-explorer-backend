const { Joi, celebrate } = require('celebrate');

const validateSignupUserReqBody = celebrate({
  body: Joi.object().keys({
    name:
      Joi
        .string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не введено имя',
          'string.min': 'имя должно быть длинной от 2 до 30 символов',
          'string.max': 'имя должно быть длинной от 2 до 30 символов',
        }),
    email:
      Joi
        .string()
        .required()
        .email()
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не указан адрес почты',
          'string.email': 'не корректный адрес почты',
        }),
    password:
      Joi
        .string()
        .required()
        .min(4)
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не введен пароль',
          'string.min': 'пароль должен состоять из не менее чем 4 символов',
        }),
  }).unknown(true),
});

const validateSigninUserReqBody = celebrate({
  body: Joi.object().keys({
    email:
      Joi
        .string()
        .required()
        .email()
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не указан адрес почты',
          'string.email': 'не корректный адрес почты',
        }),
    password:
      Joi
        .string()
        .required()
        .min(4)
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не введен пароль',
          'string.min': 'пароль должен состоять из не менее чем 4 символов',
        }),
  }).unknown(true),
});

const validateUpdateUserReqBody = celebrate({
  body: Joi.object().keys({
    name:
      Joi
        .string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не введено имя',
          'string.min': 'имя должно быть длинной от 2 до 30 символов',
          'string.max': 'имя должно быть длинной от 2 до 30 символов',
        }),
    email:
      Joi
        .string()
        .required()
        .email()
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не указан адрес почты',
          'string.email': 'не корректный адрес почты',
        }),
  }).unknown(true),
});

const validateCreateMovieNoteReqBody = celebrate({
  body: Joi.object().keys({
    country:
      Joi
        .string()
        .required()
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле "страна"',
        }),
    director:
      Joi
        .string()
        .required()
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле "режиссер"',
        }),
    duration:
      Joi
        .number()
        .required()
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле "длительность"',
        }),
    year:
      Joi
        .string()
        .required()
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле "год выпуска"',
        }),
    description:
      Joi
        .string()
        .required()
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле "описание"',
        }),
    image:
      Joi
        .string()
        .required()
        .pattern(/^https?:\/\/[a-zA-Z0-9-]{2,64}\.[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{2,}/)
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле "постер"',
          'string.pattern.base': 'не корректная ссылка',
        }),
    trailer:
      Joi
        .string()
        .required()
        .pattern(/^https?:\/\/[a-zA-Z0-9-]{2,64}\.[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{2,}/)
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле "трейлер"',
          'string.pattern.base': 'не корректная ссылка',
        }),
    thumbnail:
      Joi
        .string()
        .required()
        .pattern(/^https?:\/\/[a-zA-Z0-9-]{2,64}\.[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{2,}/)
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле "мини-постер"',
          'string.pattern.base': 'не корректная ссылка',
        }),
    movieId:
      Joi
        .string()
        .required()
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле "Id фильма"',
        }),
    nameRU:
      Joi
        .string()
        .required()
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле "Название (рус.)"',
        }),
    nameEN:
      Joi
        .string()
        .required()
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле "Название (англ.)"',
        }),
  }).unknown(true),
});

const validateDeleteMovieNoteReqParams = celebrate({
  params: Joi.object().keys({
    id:
      Joi
        .string()
        .hex()
        .length(24)
        .messages({
          'string.hex': 'id должно состоять из 24 hex-символов',
          'string.length': 'id должно состоять из 24 hex-символов',
        }),
  }).unknown(true),
});

module.exports = {
  validateSignupUserReqBody,
  validateSigninUserReqBody,
  validateUpdateUserReqBody,
  validateCreateMovieNoteReqBody,
  validateDeleteMovieNoteReqParams,
};
