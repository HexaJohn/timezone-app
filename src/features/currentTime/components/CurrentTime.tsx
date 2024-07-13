// src/features/currentTime/components/CurrentTime.tsx

import React from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { CurrentTimeProps } from '../types';

/**
 * Formats a date object into a string with date and time.
 * 
 * @param {Date} date - The date to format
 * @param {string} timezone - The timezone to use for formatting
 * @returns {string} A formatted date and time string
 */
const formatDateTime = (date: Date, timezone: string): string => {
    return date.toLocaleString('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });
};

/**
 * CurrentTime component displays the current time, adjusted time, and date,
 * and allows the user to select a different timezone.
 * 
 * @param {CurrentTimeProps} props - The props for the CurrentTime component (currently empty)
 * @returns {React.ReactElement} A React element displaying the current time, adjusted time, and timezone selector
 */
export const CurrentTime: React.FC<CurrentTimeProps> = () => {
    const { currentTime, adjustedTime, timezone, setTimezone, supportedTimezones, currentOffset } = useCurrentTime();

    return (
        <div className="text-green-400">
            <div className="mb-4">
                <p className="text-sm text-gray-500">Actual Time:</p>
                <p className="text-2xl font-bold">
                    {formatDateTime(currentTime, timezone)}
                </p>
            </div>
            <div className="mb-4">
                <p className="text-sm text-gray-500">Adjusted Time:</p>
                <p className="text-2xl font-bold text-red-400">
                    {formatDateTime(adjustedTime, timezone)}
                </p>
            </div>
            <p className="mt-2">Timezone: <span className="text-blue-400">{timezone}</span></p>
            <p className="mt-2">Offset: <span className="text-yellow-400">UTC {currentOffset >= 0 ? '+' : ''}{currentOffset / 60}</span></p>
            <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="mt-2 p-2 border rounded w-full bg-black"
            >
                {[...new Set(supportedTimezones)].map((tz) => (
                    <option key={tz.id} value={tz.timezone}>
                        {`${tz.city} | ${tz.timezone}`}
                    </option>
                ))}
            </select>
        </div>
    );
};

