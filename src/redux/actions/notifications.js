import {
    CREATE_NOTIFICATION,
    DISMISS_NOTIFICATION
} from '../types';

const create = ({status, title, message}) => (dispatch, getState) => {
    const {notifications} = getState().notifications;
    let notification, i;

    i = notifications.length > 0 ? Math.max.apply(null, notifications.map(t => t.id)) + 1 : 1;

    notification = {id: i, status, title, message};

    const newNotifications = notifications;
    newNotifications.push(notification);

    dispatch({type: CREATE_NOTIFICATION, payload: newNotifications});

    setTimeout(() => dispatch(dismiss(notification.id)), 5000);
};

const dismiss = (id) => (dispatch, getState) => {
    const {notifications} = getState().notifications;

    const newNotifications = notifications.filter(n => n.id !== id);

    dispatch({type: DISMISS_NOTIFICATION, payload: newNotifications});
}

export const notifications = {create, dismiss};