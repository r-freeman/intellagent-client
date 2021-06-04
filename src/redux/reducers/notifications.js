import {
    CREATE_NOTIFICATION,
    DISMISS_NOTIFICATION,
} from '../types';

const initialState = {
    notifications: []
};

const notifications = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTIFICATION:
            return {...state, notifications: action.payload};
        case DISMISS_NOTIFICATION:
            return {...state, notifications: action.payload};
        default:
            return state;
    }
};

export default notifications;