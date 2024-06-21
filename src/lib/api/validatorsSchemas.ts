import Joi, { required } from "joi";
import { NotificationStateCodeEnum, NotificationTypeCodeEnum } from "../notification";

export const userValidationSchema = Joi.object({
    userId: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string(),
    description: Joi.string(),
    profilPictureUrl: Joi.string(),
    firstConnexion: Joi.boolean().default(false)
})

export const travelValidationSchema = Joi.object({
    
})

export const transportValidationSchema = Joi.object({

})

export const photoValidationSchema = Joi.object({
    
})

export const notificationValidationSchema = Joi.object({
    subject: Joi.string().max(255).required(),
    content: Joi.string().max(1500).required(),
    user: Joi.string().required(),
    state: Joi.string().length(3).allow([NotificationStateCodeEnum.READ, NotificationStateCodeEnum.UNREAD]),
    type: Joi.string().length(3).allow([NotificationTypeCodeEnum.ACTION, NotificationTypeCodeEnum.INFO])
})

export const evaluationValidationSchema = Joi.object({
    
})