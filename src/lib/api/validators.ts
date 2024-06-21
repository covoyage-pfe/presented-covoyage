import {
    userValidationSchema,
    travelValidationSchema,
    transportValidationSchema,
    photoValidationSchema,
    notificationValidationSchema,
    evaluationValidationSchema
} from './validatorsSchemas';

/**
 * validate a user data send as parameter of a request
 * @param user the user data to validate
 * @returns an objet with error property defined if the the data is invalidated
 */
export const validateUserParams = (user): {error} => {
    return userValidationSchema.validate(user)
}

/**
 * validate a user travel data send as parameter of a request
 * @param travel the user data to validate
 * @returns an objet with error property defined if the the data is invalidated
 */
export const validateTravelParams = (travel): {error} => {
    return travelValidationSchema.validate(travel)
}

/**
 * validate a notification data send as parameter of a request
 * @param notification the user data to validate
 * @returns an objet with error property defined if the the data is invalidated
 */
export const validateNotificationParams = (notification): {error} => {
    return notificationValidationSchema.validate(notification)
}
