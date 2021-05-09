import {
    FETCH_TICKETS_BEGIN,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_FAILURE,
    FIND_TICKET_SUCCESS,
    FIND_TICKET_FAILURE,
    CREATE_MESSAGE_BEGIN,
    CREATE_MESSAGE_SUCCESS,
    CREATE_MESSAGE_FAILURE
} from '../types';

const initialState = {tickets: [], ticket: {}, isFetchingTickets: false, isCreatingMessage: false};

const tickets = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TICKETS_BEGIN:
            return {...state, isFetchingTickets: true};
        case FETCH_TICKETS_SUCCESS:
            return {...state, tickets: action.payload, isFetchingTickets: false};
        case FETCH_TICKETS_FAILURE:
            return initialState;
        case FIND_TICKET_SUCCESS:
            return {...state, ticket: action.payload}
        case FIND_TICKET_FAILURE:
            return {...state, ticket: {}}
        case CREATE_MESSAGE_BEGIN:
            return {...state, isCreatingMessage: true};
        case CREATE_MESSAGE_SUCCESS:
            return {...state, tickets: action.payload, isCreatingMessage: false};
        case CREATE_MESSAGE_FAILURE:
            return {...state, isCreatingMessage: false};
        default:
            return state;
    }
};

export default tickets;