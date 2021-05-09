import React, {useRef, useState} from 'react';
import {Transition} from '@headlessui/react';

import MessageInput from './MessageInput';
import MessageList from './MessageList';

function MessagePanel() {
    const [messageMenu, setMessageMenu] = useState(false);
    const messagesEndRef = useRef();

    const toggleMessageMenu = () => setMessageMenu(!messageMenu);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div className="w-full xl:w-2/3">
            <section>
                <div
                    className="mt-4 bg-white sm:rounded-lg shadow rounded-lg">
                    <div
                        className="px-4 py-5 bg-white border-b border-gray-200">
                        <div className="flex justify-between items-center">
                            <h3
                                className="text-base leading-6 font-medium text-gray-900 mr-2">
                                Message history
                            </h3>
                            <div className="relative inline-block text-left">
                                <div>
                                    <button type="button"
                                            className={`${messageMenu ? 'text-gray-600' : 'text-gray-400'} rounded-full flex items-center hover:text-gray-600 focus:outline-none`}
                                            id="options-menu" aria-expanded="true"
                                            aria-haspopup="true"
                                            onBlur={() => setMessageMenu(false)}
                                            onClick={() => toggleMessageMenu()}>
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
                                    show={messageMenu}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                    role="menu" aria-orientation="vertical"
                                    aria-labelledby="options-menu">
                                    <div className="py-1" role="none">
                                        <button type="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                                                role="menuitem">Email transcript
                                        </button>
                                        <button type="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                                                role="menuitem">Export to CSV
                                        </button>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 pt-5 max-h-96 overflow-y-auto">
                        <ul className="block">
                            <MessageList/>
                            <li ref={messagesEndRef}/>
                        </ul>
                    </div>
                    <MessageInput
                        scrollToBottom={scrollToBottom}/>
                </div>
            </section>
        </div>
    )
}

export default MessagePanel;