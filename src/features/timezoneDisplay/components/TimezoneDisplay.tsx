// src/features/timezoneDisplay/components/TimezoneDisplay.tsx

import React from 'react';
import { useTimezoneDisplay } from '../hooks/useTimezoneDisplay';
import { TimezoneDisplayProps, TimezoneCardProps } from '../types';

const TimezoneCard: React.FC<TimezoneCardProps> = ({ timezone, onRemove, getTime }) => {
    const time = getTime(timezone.name);

    return (
        <div className="bg-white shadow rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold">{timezone.name}</h3>
            <p className="text-2xl font-bold">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-sm text-gray-500">
                {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-sm text-gray-500">
                UTC {timezone.offset >= 0 ? '+' : ''}{timezone.offset / 60}
            </p>
            <button
                onClick={() => onRemove(timezone.name)}
                className="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
                Remove
            </button>
        </div>
    );
};

export const TimezoneDisplay: React.FC<TimezoneDisplayProps> = () => {
    const { timezones, removeTimezone, getTimezoneTime } = useTimezoneDisplay();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Selected Timezones</h2>
            {timezones.length === 0 ? (
                <p>No timezones selected. Use the search to add timezones.</p>
            ) : (
                timezones.map(timezone => (
                    <TimezoneCard
                        key={timezone.name}
                        timezone={timezone}
                        onRemove={removeTimezone}
                        getTime={getTimezoneTime}
                    />
                ))
            )}
        </div>
    );
};