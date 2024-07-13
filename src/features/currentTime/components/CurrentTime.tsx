// src/features/currentTime/components/CurrentTime.tsx

import React from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { CurrentTimeProps } from '../types';

/**
 * A list of common timezones.
 * This is a fallback for environments where Intl.supportedValuesOf is not available.
 * Note: This list is not exhaustive and may need to be expanded based on your needs.
 */
const COMMON_TIMEZONES = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney',
    // Add more timezones as needed
];

/**
 * Gets a list of supported timezones.
 * It attempts to use Intl.supportedValuesOf if available, otherwise falls back to COMMON_TIMEZONES.
 * 
 * @returns {string[]} An array of timezone strings
 */
const getSupportedTimezones = (): string[] => {
    // Check if Intl.supportedValuesOf is available
    if (typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl) {
        // TypeScript doesn't recognize supportedValuesOf, so we need to use type assertion
        return (Intl as any).supportedValuesOf('timeZone');
    }
    // Fallback to common timezones if the method is not available
    return COMMON_TIMEZONES;
};

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
 * CurrentTime component displays the current time and date,
 * and allows the user to select a different timezone.
 * 
 * @param {CurrentTimeProps} props - The props for the CurrentTime component (currently empty)
 * @returns {React.ReactElement} A React element displaying the current time and timezone selector
 */
export const CurrentTime: React.FC<CurrentTimeProps> = () => {
    // Use the custom hook to get the current time, timezone, and timezone setter
    const { currentTime, adjustedTime, timezone, setTimezone } = useCurrentTime();

    // Get the list of supported timezones
    const supportedTimezones = getSupportedTimezones();

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
            {/* Display the current timezone */}
            <p className="mt-2">Timezone: {timezone}</p>
            {/* Dropdown to select a different timezone */}
            <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="mt-2 p-2 border rounded"
            >
                {/* Generate options for all supported timezones */}
                {supportedTimezones.map((tz) => (
                    <option key={tz} value={tz}>
                        {tz}
                    </option>
                ))}
            </select>
        </div>
    );
};