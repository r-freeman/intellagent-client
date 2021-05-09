import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Transition} from '@headlessui/react';

import actions from '../redux/actions';

import {Sidebar, TicketTable, UserMenu} from '../components';

function Tickets() {
    const {isLoggedIn} = useSelector(state => state.auth);
    const {tickets} = useSelector(state => state.tickets);
    const [actionButton, setActionButton] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        if (tickets.length === 0) {
            dispatch(actions.tickets.fetchTickets());
        }
    }, [dispatch, tickets]);

    useEffect(() => {
        if (!isLoggedIn) {
            // redirect unauthenticated users
            history.push('/login');
        }
    }, [isLoggedIn, history]);

    const toggleSidebar = () => setSidebar(!sidebar);
    const toggleActionButton = () => setActionButton(!actionButton);

    return (
        <div className="h-screen flex overflow-hidden bg-white">
            {isLoggedIn &&
            <React.Fragment>
                <Sidebar
                    sidebar={sidebar}
                    toggleSidebar={toggleSidebar}
                />
                <div className="flex flex-col w-0 flex-1 overflow-hidden">
                    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex="0">
                        <UserMenu
                            toggleSidebar={toggleSidebar}/>
                        <div className="px-4 py-3 w-full space-y-6">
                            <div className="border-b border-gray-200">
                                <div>
                                    <h1 className="text-xl leading-6 font-medium text-gray-900">
                                        Tickets
                                    </h1>
                                    <div className="mt-12">
                                        <nav className="space-x-8">
                                            {/*// <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->*/}
                                            <button type="button"
                                                    className="border-blue-500 text-blue-500 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                                                    aria-current="page">
                                                All
                                            </button>
                                            {/*<button type="button"*/}
                                            {/*        className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">*/}
                                            {/*    Unassigned*/}
                                            {/*</button>*/}
                                            <button type="button"
                                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                                                Open
                                            </button>
                                            <button type="button"
                                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm">
                                                Closed
                                            </button>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <div>
                                    <label htmlFor="search" className="sr-only">Search</label>
                                    <div className="relative rounded-md">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-gray-400"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd"
                                                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </div>
                                        <input type="search" name="search" id="search"
                                               className="appearance-none block w-full sm:w-64 pl-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 sm:text-sm"
                                               placeholder="Search"/>
                                    </div>
                                </div>
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button type="button"
                                                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-400"
                                                id="options-menu" aria-haspopup="true" aria-expanded="true"
                                                onBlur={() => setActionButton(false)}
                                                onClick={() => toggleActionButton()}>
                                            None selected
                                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd"
                                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <Transition
                                        show={actionButton}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <div
                                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
                                            role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <div className="py-1">
                                                <a href="/"
                                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                   role="menuitem">Edit</a>
                                                <a href="/"
                                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                   role="menuitem">Duplicate</a>
                                            </div>
                                            <div className="py-1">
                                                <a href="/"
                                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                   role="menuitem">Archive</a>
                                                <a href="/"
                                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                   role="menuitem">Move</a>
                                            </div>
                                            <div className="py-1">
                                                <a href="/"
                                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                   role="menuitem">Share</a>
                                                <a href="/"
                                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                   role="menuitem">Add to favorites</a>
                                            </div>
                                            <div className="py-1">
                                                <a href="/"
                                                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                   role="menuitem">Delete</a>
                                            </div>
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div
                                            className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                            <TicketTable/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </React.Fragment>
            }
        </div>
    )
}

export default Tickets;