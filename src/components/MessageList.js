import React from 'react';
import {useSelector} from 'react-redux';

import MessageItem from './MessageItem';

function MessageList() {
    const {ticket} = useSelector(state => state.tickets);

    return (
        <React.Fragment>
            {ticket.messages.map((message, index) =>
                <MessageItem
                    key={message._id}
                    message={message}
                    index={index}/>
            )}
        </React.Fragment>
    )
}

export default MessageList;