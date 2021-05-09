import {BASE_URL} from '../../api';
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

const findTicket = (reference) => (dispatch, getState) => {
    try {
        const ticket = getState().tickets.tickets.find(ticket => ticket.reference === reference);

        if (typeof ticket !== 'undefined') {
            dispatch({type: FIND_TICKET_SUCCESS, payload: ticket});
        } else {
            dispatch({type: FIND_TICKET_FAILURE});
        }
    } catch (err) {
        console.log(err);
        dispatch({type: FIND_TICKET_FAILURE});
    }
}

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
                recipient_id: ticket.customer.twitter_id_str
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

export const tickets = {fetchTickets, findTicket, createMessage};
