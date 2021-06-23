import React from 'react';
import {Transition} from '@headlessui/react';

import NotificationItem from './NotificationItem';
import {useSelector} from 'react-redux';

function NotificationsPanel({notificationsPanel, toggleNotificationsPanel}) {
    const {notifications} = useSelector(state => state.notifications);

    const filteredNotifications = [...notifications].filter(notification => typeof notification._id !== 'undefined');
    const sortedNotifications = filteredNotifications.sort((a, b) => Number(new Date(b.created_at)) - Number(new Date(a.created_at)));

    return (
        <React.Fragment>
            <div className="relative inline-flex mr-4">
                <button type="button"
                        className="inline-flex items-center text-gray-400 hover:text-gray-500 rounded-md transition ease-in-out duration-150 focus:outline-none"
                        onClick={toggleNotificationsPanel}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                </button>
                {notifications.length > 0 &&
                <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                    <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"/>
                </span>}
            </div>
            <Transition
                show={notificationsPanel}
                className="fixed inset-0 overflow-hidden z-20"
                aria-labelledby="slide-over-title"
                role="dialog"
                aria-modal="true">
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        show={notificationsPanel}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="absolute inset-0 bg-gray-600 bg-opacity-75 transition-opacity"
                             aria-hidden="true"
                             onClick={toggleNotificationsPanel}/>
                    </Transition.Child>
                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <Transition.Child
                            show={notificationsPanel}
                            enter="transform transition ease-in-out duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full">
                            <div className="relative w-screen max-w-md">
                                <Transition.Child
                                    show={notificationsPanel}
                                    enter="ease-in-out duration-700"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-700"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0">
                                    <div className="absolute top-0 left-0 -ml-12 pt-2 flex">
                                        <button
                                            className="flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                            onClick={toggleNotificationsPanel}>
                                            <span className="sr-only">Close panel</span>
                                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg"
                                                 fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                    </div>
                                    <div
                                        className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-auto h-screen">
                                        <div className="px-4 sm:px-6">
                                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                                                Notifications
                                            </h2>
                                        </div>
                                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                            <div className="absolute inset-0 px-4 sm:px-6">
                                                <div className="h-full space-y-6">
                                                    {sortedNotifications.length > 0 &&
                                                    sortedNotifications.map(({_id, type, title, message, created_at}, index) =>
                                                        <NotificationItem
                                                            key={index}
                                                            id={_id}
                                                            type={type}
                                                            title={title}
                                                            message={message}
                                                            created_at={created_at}
                                                            panel={true}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Transition>
        </React.Fragment>
    );
}

export default NotificationsPanel;