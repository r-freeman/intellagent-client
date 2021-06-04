import {format, parseISO, formatDistanceToNow} from 'date-fns';
import React, {useEffect, useState} from 'react';

function Datetime({date, timeAgo = false}) {
    const formatToNow = (date) => formatDistanceToNow(new Date(date), {addSuffix: true});
    const formatDate = (date) => format(parseISO(date), 'PP pp');
    const [datetime, setDatetime] = useState(formatToNow(date));

    useEffect(() => {
        // update the time every minute
        if (timeAgo) {
            const interval = setInterval(() => {
                setDatetime(formatToNow(date));
            }, 1000 * 60);

            // clean up
            return () => {
                clearInterval(interval);
            }
        }
    }, [timeAgo, date]);

    return (
        <time dateTime={date}>
            {!timeAgo ? formatDate(date) : datetime}
        </time>
    )
}

export default Datetime;