// src/features/currentTime/components/CurrentTime.tsx

import React from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { CurrentTimeProps } from '../types';
import { CityInfo } from '../../../shared/utils/timezones';
import { CityTimezone } from '../../timezoneSearch/types';

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
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Current Time</h2>
            <div className="mb-4">
                <p className="text-sm text-gray-500">Actual Time:</p>
                <p className="text-2xl font-bold">
                    {formatDateTime(currentTime, timezone)}
                </p>
            </div>
            <div className="mb-4">
                <p className="text-sm text-gray-500">Adjusted Time:</p>
                <p className="text-2xl font-bold">
                    {formatDateTime(adjustedTime, timezone)}
                </p>
            </div>
            <p className="mt-2">Timezone: {timezone}</p>
            <p className="mt-2">Offset: UTC {currentOffset >= 0 ? '+' : ''}{currentOffset / 60}</p>
            <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="mt-2 p-2 border rounded w-full"
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