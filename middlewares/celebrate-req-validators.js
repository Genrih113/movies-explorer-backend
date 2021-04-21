const { Joi, celebrate } = require('celebrate');

const regex = /^https?:\/\/[a-zA-Z0-9-]{2,64}\.[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]{2,}/;

const validateSignupUserReqBody = celebrate({
  body: Joi.object().keys({
    name:
      Joi
        .string()
        .required()
        .min(2)
        .max(30)
        .label('имя')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
          'string.min': 'имя должно быть длинной от 2 до 30 символов',
          'string.max': 'имя должно быть длинной от 2 до 30 символов',
        }),
    email:
      Joi
        .string()
        .required()
        .email()
        .label('почта')
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
          'string.email': 'не корректное значение в поле {#label}',
        }),
    password:
      Joi
        .string()
        .required()
        .min(4)
        .label('пароль')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
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
        .label('почта')
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
          'string.email': 'не корректное значение в поле {#label}',
        }),
    password:
      Joi
        .string()
        .required()
        .min(4)
        .label('пароль')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
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
        .label('имя')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
          'string.min': 'имя должно быть длинной от 2 до 30 символов',
          'string.max': 'имя должно быть длинной от 2 до 30 символов',
        }),
    email:
      Joi
        .string()
        .required()
        .email()
        .label('почта')
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
          'string.email': 'не корректное значение в поле {#label}',
        }),
  }).unknown(true),
});

const validateCreateMovieNoteReqBody = celebrate({
  body: Joi.object().keys({
    country:
      Joi
        .string()
        .required()
        .label('страна')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
        }),
    director:
      Joi
        .string()
        .required()
        .label('режиссер')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
        }),
    duration:
      Joi
        .number()
        .required()
        .label('продолжительность')
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'number.base': 'поле {#label} должно содержать число',
        }),
    year:
      Joi
        .string()
        .required()
        .label('год')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
        }),
    description:
      Joi
        .string()
        .required()
        .label('описание')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
        }),
    image:
      Joi
        .string()
        .required()
        .pattern(regex)
        .label('постер')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
          'string.pattern.base': 'не корректная ссылка в поле {#label}',
        }),
    trailer:
      Joi
        .string()
        .required()
        .pattern(regex)
        .label('трейлер')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
          'string.pattern.base': 'не корректная ссылка в поле {#label}',
        }),
    thumbnail:
      Joi
        .string()
        .required()
        .pattern(regex)
        .label('мини-постер')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
          'string.pattern.base': 'не корректная ссылка в поле {#label}',
        }),
    movieId:
      Joi
        .number()
        .required()
        .label('id-фильма')
        .messages({
          'any.required': 'пропущено обязательное поле {#label}',
          'number.base': 'поле {#label} должно содержать число',
        }),
    nameRU:
      Joi
        .string()
        .required()
        .label('название фильма (рус.)')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
        }),
    nameEN:
      Joi
        .string()
        .required()
        .label('название фильма (англ.)')
        .messages({
          'string.base': 'поле {#label} должно содержать строку',
          'any.required': 'пропущено обязательное поле {#label}',
          'string.empty': 'не заполнено поле {#label}',
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
