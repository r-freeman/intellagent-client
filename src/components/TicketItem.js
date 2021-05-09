import React from 'react';
import {useHistory} from 'react-router-dom';

function TicketItem({ticket}) {
    let history = useHistory();

    const dateString = (date) => new Date(date).toDateString();

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <input id="select_ticket" name="select_ticket"
                       type="checkbox"
                       className="focus:ring-blue-400 h-4 w-4 text-blue-500 border-gray-300 rounded"/>
            </td>
            <td
                className="px-6 py-4 whitespace-nowrap">
                <p
                    className={`${ticket.status === 'unassigned'
                        ? 'bg-red-100 text-red-800'
                        : ticket.status === 'open'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'} px-2 inline-flex text-xs leading-5 font-semibold rounded-full capitalize`}>
                    {ticket.status}
                </p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => history.push(`/tickets/${ticket.reference}`)}>
                <p className="text-sm text-gray-500">
                    {ticket.reference}
                </p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full"
                             src={ticket.customer.twitter_photo_url}
                             alt={ticket.customer.name}/>
                    </div>
                    <div className="ml-4">
                        <p
                            className="text-sm font-medium text-gray-900">
                            {ticket.customer.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            @{ticket.customer.twitter_screen_name}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap cursor-pointer"
                onClick={() => history.push(`/tickets/${ticket.reference}`)}>
                <p
                    className={`${ticket.messages[ticket.messages.length - 1].read !== true ? 'font-semibold' : ''} text-sm text-gray-900`}>
                    {`${ticket.messages[ticket.messages.length - 1].body.substring(0, 80)}...`}
                </p>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <p className="text-sm text-gray-500">
                    {dateString(ticket.createdAt)}
                </p>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <p className="text-sm text-gray-500">
                    {dateString(ticket.updatedAt)}
                </p>
            </td>
        </tr>
    )
}

export default TicketItem;