import Joi from 'joi';

export const sendMessageSchema = Joi.object({
    content: Joi.string().required(),
    receiverId: Joi.number().required()
});
