import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {io} from 'socket.io-client';

import {SOCKETS_URL} from '../api';
import actions from '../redux/actions';

const TICKET_ASSIGNED = 'TICKET_ASSIGNED',
    TICKET_NEW_MESSAGE = 'TICKET_NEW_MESSAGE';

function EventBus() {
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const socket = io(SOCKETS_URL, {
            auth: {
                token: user.token
            }
        });

        // set up socket listeners
        socket.on(TICKET_ASSIGNED, (ticket) => handleEvent(TICKET_ASSIGNED, ticket));
        socket.on(TICKET_NEW_MESSAGE, (ticket) => handleEvent(TICKET_NEW_MESSAGE, ticket));

        return () => {
            // clean up socket listeners
            socket.off(TICKET_ASSIGNED, handleEvent);
            socket.off(TICKET_NEW_MESSAGE, handleEvent);
        }
    }, []);

    const handleEvent = useCallback(async (event, payload) => {
        switch (event) {
            case TICKET_ASSIGNED:
                await dispatch(actions.tickets.fetchTickets());
                dispatch(actions.notifications.create({
                    status: "info",
                    title: "New ticket",
                    message: "A new ticket was assigned to you."
                }));
                break;
            case TICKET_NEW_MESSAGE:
                dispatch(actions.tickets.updateTicket(payload));
                dispatch(actions.notifications.create({
                    status: "info",
                    title: "New message",
                    message: `New message from ${payload.customer.name}.`
                }));
                break;
            default:
                return;
        }
    }, []);

    return null;
}

export default EventBus;