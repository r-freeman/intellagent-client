import React from 'react';
import {useDispatch} from 'react-redux';
import actions from '../redux/actions';
import TimeAgo from './TimeAgo';

function NotificationItem({id, type, title, message, created_at = null, panel = false}) {
    const dispatch = useDispatch();

    if (panel) {
        return (
            <div
                className="w-full bg-white pointer-events-auto overflow-hidden">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        {type === 'info'
                            ?
                            <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            : type === 'success'
                                ?
                                <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                :
                                <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                        }
                    </div>
                    <div className="ml-3 w-0 flex-1">
                        <p className="font-medium text-gray-900">
                            {title}
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                            {message}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            <TimeAgo date={created_at}/>
                        </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={async () => await dispatch(actions.notifications.deleteNotification(id))}>
                            <span className="sr-only">Close</span>
                            <svg className="h-5 w-5"
                                 xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 20 20" fill="currentColor"
                                 aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        {type === 'info'
                            ?
                            <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            : type === 'success'
                                ?
                                <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                :
                                <svg className="h-6 w-6 text-red-400" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                        }
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">
                            {title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {message}
                        </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                        <button
                            className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                            onClick={() => dispatch(actions.notifications.dismiss(id))}>
                            <span className="sr-only">Close</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                 fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotificationItem;