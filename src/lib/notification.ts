enum NotificationStateCodeEnum {
    READ = '001',
    UNREAD = '002',
    ALL = '003'
}

enum NotificationTypeCodeEnum {
    WELCOME = '001',
    NEW_SUBSCRIBER = '002',
    ACCEPTED = '003',
    DECLINE = '004',
    RENOUNCED = '005',
    TRAVEL_CANCELLED = '006',
    TRAVEL_MODIFIED = '007',
    NEW_MESSAGE = '008',
}

function getNotificationSubject(type: NotificationTypeCodeEnum): string {
    switch (type) {
        case NotificationTypeCodeEnum.WELCOME:
            return "Welcome to co voyage";
        case NotificationTypeCodeEnum.NEW_SUBSCRIBER:
            return "New subscriber for your travel!";
        case NotificationTypeCodeEnum.ACCEPTED:
            return "Pack your bags!";
        case NotificationTypeCodeEnum.DECLINE:
            return "Subscription declined!";
        case NotificationTypeCodeEnum.RENOUNCED:
            return "Subcription cancelled!";
        case NotificationTypeCodeEnum.TRAVEL_MODIFIED:
            return "Trip modified";
        case NotificationTypeCodeEnum.TRAVEL_CANCELLED:
            return "Trip cancelled!";
        case NotificationTypeCodeEnum.NEW_MESSAGE:
            return "New message!";
        default:
            return "Fake notification";
    }
}

function getNotificationContent(type: NotificationTypeCodeEnum, info: any = null): string {
    switch (type) {
        case NotificationTypeCodeEnum.WELCOME:
            return "Welcome to co voyage. Get started by create a new travel.";
        case NotificationTypeCodeEnum.NEW_SUBSCRIBER:
            return `A new user want to travel with you. Click on this notification to manage your the travel subscribers.`;
        case NotificationTypeCodeEnum.ACCEPTED:
            return "You were accepted to travel.";
        case NotificationTypeCodeEnum.DECLINE:
            return "Sorry but your subscribe has been declined. But don't give up try with a new travel.";
        case NotificationTypeCodeEnum.RENOUNCED:
            return "Sorry but your subscription was deleted from the the las travel";
        case NotificationTypeCodeEnum.TRAVEL_MODIFIED:
            return "Hi, your current trip has been modified. Take a tour to see the modification";
        case NotificationTypeCodeEnum.TRAVEL_CANCELLED:
            return "Sorry but your current trip has been cancelled. Don't give up search a new travel";
        case NotificationTypeCodeEnum.NEW_MESSAGE:
            return `You got a new message from ${info.sender}, check your email inbox to read it`;
        default:
            return "Don't take care about this notification";
    }
}

function getNotificationAction(type: NotificationTypeCodeEnum):string {
    switch (type) {
        case NotificationTypeCodeEnum.WELCOME:
            return "/search";
        case NotificationTypeCodeEnum.NEW_SUBSCRIBER:
            return "/dashboard/my-travels/current";
        case NotificationTypeCodeEnum.ACCEPTED:
            return "/travel/current";
        case NotificationTypeCodeEnum.DECLINE:
            return "/search";
        case NotificationTypeCodeEnum.RENOUNCED:
            return "/search";
        case NotificationTypeCodeEnum.TRAVEL_MODIFIED:
            return "/travel/current";
        case NotificationTypeCodeEnum.TRAVEL_CANCELLED:
            return "/search";
        default:
            return "";
    }
}


export {
    NotificationTypeCodeEnum,
    NotificationStateCodeEnum,
    getNotificationSubject,
    getNotificationContent,
    getNotificationAction,
}
