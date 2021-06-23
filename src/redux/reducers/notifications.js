import {
    CREATE_NOTIFICATION,
    DISMISS_NOTIFICATION,
    FETCH_NOTIFICATIONS_BEGIN,
    FETCH_NOTIFICATIONS_SUCCESS,
    FETCH_NOTIFICATIONS_FAILURE,
    DELETE_NOTIFICATION_BEGIN,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAILURE
} from '../types';

const initialState = {
    localNotifications: [],
    notifications: [],
    isFetchingNotifications: false,
    isDeletingNotification: false
};

const notifications = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTIFICATION:
            return {...state, localNotifications: action.payload};
        case DISMISS_NOTIFICATION:
            return {...state, localNotifications: action.payload};
        case FETCH_NOTIFICATIONS_BEGIN:
            return {...state, notifications: [], isFetchingNotifications: true};
        case FETCH_NOTIFICATIONS_SUCCESS:
            return {...state, notifications: action.payload, isFetchingNotifications: false};
        case FETCH_NOTIFICATIONS_FAILURE:
            return {...state, isFetchingNotifications: false}
        case DELETE_NOTIFICATION_BEGIN:
            return {...state, isDeletingNotification: true};
        case DELETE_NOTIFICATION_SUCCESS:
            return {...state, notifications: action.payload, isDeletingNotification: false};
        case DELETE_NOTIFICATION_FAILURE:
            return {...state, isDeletingNotification: false}
        default:
            return state;
    }
};

export default notifications;