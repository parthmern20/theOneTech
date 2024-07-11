import Joi from 'joi';

export const ValidateSchema = (schema) => {
    return async (req, res, next) => {
        try {
            const fieldsToValidate = { ...req.body, ...req.files };
            await schema.validateAsync(fieldsToValidate);
            next();
        } catch (error) {
            return res.status(422).json({
                error: true,
                message: error.details[0].message.replace(/['"]+/g, '')
            });
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            age: Joi.number().integer().min(1).required(),
            mobile: Joi.string().pattern(/^[0-9]{10,14}$/).required(),
            email: Joi.string().email().required(),
        }),
        update: Joi.object({
            name: Joi.string(),
            address: Joi.string(),
            age: Joi.number().integer().min(1),
            mobile: Joi.string().pattern(/^[0-9]{10,14}$/),
            email: Joi.string().email(),
        }),
    },

    admin: {
         register : Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
          }),
          
          login : Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
          })
    }
}