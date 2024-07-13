// src/features/timezoneSearch/components/TimezoneSearch.tsx

import React from 'react';
import { useTimezoneSearch } from '../hooks/useTimezoneSearch';
import { TimezoneSearchProps, Timezone } from '../types';

/**
 * TimezoneSearch component allows users to search for and select timezones.
 * It displays a search input and a list of matching timezones.
 *
 * @param {TimezoneSearchProps} props - The props for the TimezoneSearch component (currently empty)
 * @returns {React.ReactElement} A React element displaying the timezone search functionality
 */
export const TimezoneSearch: React.FC<TimezoneSearchProps> = () => {
    const { searchTerm, setSearchTerm, searchResults, selectTimezone } = useTimezoneSearch();

    /**
     * Handles changes to the search input.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the input
     */
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    /**
     * Handles the selection of a timezone.
     * 
     * @param {Timezone} timezone - The selected timezone
     */
    const handleTimezoneSelect = (timezone: Timezone) => {
        selectTimezone(timezone);
        setSearchTerm(''); // Clear the search term after selection
    };

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Search Timezones</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for a timezone..."
                className="w-full p-2 border rounded mb-4"
            />
            <ul className="max-h-60 overflow-y-auto">
                {searchResults.map((timezone) => (
                    <li
                        key={timezone.name}
                        onClick={() => handleTimezoneSelect(timezone)}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                    >
                        {timezone.name} (UTC {timezone.offset >= 0 ? '+' : ''}{timezone.offset / 60})
                    </li>
                ))}
            </ul>
        </div>
    );
};