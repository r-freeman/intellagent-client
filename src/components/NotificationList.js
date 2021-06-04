import React from 'react';
import NotificationItem from './NotificationItem';
import {useSelector} from 'react-redux';

function NotificationList() {
    const {notifications} = useSelector(state => state.notifications);

    // show notifications in reverse order, limited to 5 at a time
    const sortedNotifications = [...notifications].reverse().slice(0, 5);

    return (
        <div aria-live="assertive"
             className="fixed inset-0 flex items-end px-4 py-6 sm:p-6 pointer-events-none sm:items-end z-10">
            {sortedNotifications.length > 0 &&
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                {sortedNotifications.map((notification) =>
                    <NotificationItem
                        key={notification.id}
                        id={notification.id}
                        status={notification.status}
                        title={notification.title}
                        message={notification.message}
                    />
                )}
            </div>
            }
        </div>
    )
}

export default NotificationList;