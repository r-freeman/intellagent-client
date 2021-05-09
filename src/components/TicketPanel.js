import React, {useState} from 'react';
import {Transition} from '@headlessui/react';
import {useSelector} from 'react-redux';

function TicketPanel() {
    const {user} = useSelector(state => state.auth);
    const {ticket} = useSelector(state => state.tickets);
    const [ticketMenu, setTicketMenu] = useState(false);

    const toggleTicketMenu = () => setTicketMenu(!ticketMenu);
    const dateString = (date) => new Date(date).toDateString();

    return (
        <section>
            <div
                className="mt-4 bg-white m:rounded-lg sm:overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 bg-white border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3
                            className="text-base leading-6 font-medium text-gray-900 mr-2">
                            Ticket information
                        </h3>
                        <div className="relative inline-block text-left">
                            <div>
                                <button type="button"
                                        className={`${ticketMenu ? 'text-gray-600' : 'text-gray-400'} rounded-full flex items-center hover:text-gray-600 focus:outline-none`}
                                        id="options-menu" aria-expanded="true"
                                        aria-haspopup="true"
                                        onBlur={() => setTicketMenu(false)}
                                        onClick={() => toggleTicketMenu()}>
                                    <span className="sr-only">Open options</span>
                                    <svg className="h-5 w-5"
                                         xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 20 20" fill="currentColor"
                                         aria-hidden="true">
                                        <path
                                            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                    </svg>
                                </button>
                            </div>
                            <Transition
                                show={ticketMenu}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu" aria-orientation="vertical"
                                aria-labelledby="options-menu">
                                <div className="py-1" role="none">
                                    <button type="button"
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                                            role="menuitem">Update
                                    </button>
                                    <button type="button"
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                                            role="menuitem">Close
                                    </button>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-5">
                    <dl>
                        <div className="grid grid-cols-3 gap-4">
                            <dt className="text-sm font-semibold text-gray-900 col-span-1">
                                Status
                            </dt>
                            <dd className="flex col-span-2">
                                 <span
                                     className={`${ticket.status === 'unassigned'
                                         ? 'bg-red-100 text-red-800' : ticket.status === 'open'
                                             ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'} inline-flex px-2 py-0.5 text-sm leading-5 font-medium rounded-full capitalize`}>
                                    {ticket.status}
                                </span>
                            </dd>
                            <dt className="text-sm font-semibold text-gray-900 col-span-1">
                                Reference
                            </dt>
                            <dd className="inline-flex items-center text-sm text-gray-900 col-span-2 capitalize">
                                <span className="mr-2">{ticket.reference}</span>
                                <button
                                    className="inline-flex items-center justify-center text-gray-400 hover:text-gray-500 focus:outline-none">
                                    <svg className="w-5 h-5" fill="none"
                                         stroke="currentColor"
                                         viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                                    </svg>
                                </button>
                            </dd>
                            <dt className="text-sm font-semibold text-gray-900 col-span-1">
                                Issue type
                            </dt>
                            <dd className="flex text-sm text-gray-900 col-span-2 capitalize">
                                                                <span
                                                                    className="flex-grow">{ticket.issue_type.name}</span>
                            </dd>
                            <dt className="text-sm font-semibold text-gray-900 col-span-1">
                                Agent
                            </dt>
                            <dd className="flex text-sm text-gray-900 col-span-2">
                                <span className="flex-grow">{user.name}</span>
                            </dd>
                            <dt className="text-sm font-semibold text-gray-900 col-span-1">
                                Team
                            </dt>
                            <dd className="flex text-sm text-gray-900 col-span-2">
                                <span className="flex-grow">{user.team.name}</span>
                            </dd>
                            <dt className="text-sm font-semibold text-gray-900 col-span-1">
                                Date created
                            </dt>
                            <dd className="flex text-sm text-gray-900 col-span-2">
                                <span
                                    className="flex-grow">{dateString(ticket.createdAt)}</span>
                            </dd>
                            <dt className="text-sm font-semibold text-gray-900 col-span-1">
                                Last updated
                            </dt>
                            <dd className="flex text-sm text-gray-900 col-span-2">
                                <span
                                    className="flex-grow">{dateString(ticket.updatedAt)}</span>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>

    )
}

export default TicketPanel;