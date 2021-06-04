import {BASE_URL} from '../../api';
import {
    FETCH_TICKETS_BEGIN,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_FAILURE,
    FETCH_TICKET_SUCCESS,
    FETCH_TICKET_FAILURE,
    UPDATE_TICKET_SUCCESS,
    UPDATE_TICKET_FAILURE,
    CREATE_MESSAGE_BEGIN,
    CREATE_MESSAGE_SUCCESS,
    CREATE_MESSAGE_FAILURE,
    CLOSE_TICKET_BEGIN,
    CLOSE_TICKET_SUCCESS,
    CLOSE_TICKET_FAILURE,
} from '../types';

const fetchTickets = () => async (dispatch, getState) => {
    try {
        dispatch({type: FETCH_TICKETS_BEGIN});

        // retrieve the token for this request
        const token = getState().auth.user.token;

        const request = await fetch(`${BASE_URL}tickets`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (request.status === 200) {
            const tickets = await request.json();

            dispatch({type: FETCH_TICKETS_SUCCESS, payload: tickets});
        }
    } catch (err) {
        console.log(err);
        dispatch({type: FETCH_TICKETS_FAILURE});
    }
};

const fetchTicket = (reference) => (dispatch, getState) => {
    const ticket = getState().tickets.tickets.find(ticket => ticket.reference === reference);

    if (typeof ticket !== 'undefined') {
        dispatch({type: FETCH_TICKET_SUCCESS, payload: ticket});
    } else {
        dispatch({type: FETCH_TICKET_FAILURE});
    }
};

const updateTicket = (ticket) => (dispatch, getState) => {
    const tickets = getState().tickets.tickets;
    const ticketIndex = tickets.findIndex(t => t._id === ticket._id);

    if (ticketIndex !== -1) {
        const newTickets = tickets;
        newTickets.splice(ticketIndex, 1, ticket);

        dispatch({type: UPDATE_TICKET_SUCCESS, payload: {tickets: newTickets, ticket}});
    } else {
        dispatch({type: UPDATE_TICKET_FAILURE});
    }
};

const closeTicket = () => async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({type: CLOSE_TICKET_BEGIN});

        const token = getState().auth.user.token;
        const {ticket, tickets} = getState().tickets;

        fetch(`${BASE_URL}tickets/${ticket._id}/status`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                status: 'closed'
            })
        }).then(response => response.json()
            .then(res => {
                if (response.status === 200) {
                    const ticket = res;
                    const ticketIndex = tickets.findIndex(t => t._id === ticket._id);
                    const newTickets = tickets;

                    newTickets.splice(ticketIndex, 1, ticket);

                    dispatch({type: CLOSE_TICKET_SUCCESS, payload: {tickets: newTickets, ticket}});
                    resolve("Ticket closed successfully.");
                } else {
                    dispatch({type: CLOSE_TICKET_FAILURE})
                    reject("Something went wrong");
                }
            })).catch(err => {
            dispatch({type: CLOSE_TICKET_FAILURE})
            reject(err);
        });
    });
};

const createMessage = (text) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({type: CREATE_MESSAGE_BEGIN});

        const token = getState().auth.user.token;
        const {ticket, tickets} = getState().tickets;

        fetch(`${BASE_URL}tickets/${ticket._id}/messages`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                text,
                recipient_id: ticket.customer.twitter_id,
                incoming: false
            })
        }).then(response => response.json()
            .then(res => {
                if (response.status === 201) {
                    const message = res;
                    const ticketIndex = tickets.findIndex(t => t._id === ticket._id);
                    const newTickets = tickets;

                    newTickets[ticketIndex].messages.push(message);

                    dispatch({type: CREATE_MESSAGE_SUCCESS, payload: newTickets});
                    resolve("Message sent successfully.");
                } else {
                    dispatch({type: CREATE_MESSAGE_FAILURE})
                    reject("Something went wrong");
                }
            })).catch(err => {
            dispatch({type: CREATE_MESSAGE_FAILURE})
            reject(err);
        });
    });
};

export const tickets = {
    fetchTickets,
    fetchTicket,
    updateTicket,
    closeTicket,
    createMessage
};
