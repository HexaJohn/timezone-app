// src/features/timezoneSearch/components/TimezoneSearch.tsx

import React from 'react';
import { useTimezoneSearch } from '../hooks/useTimezoneSearch';
import { TimezoneSearchProps } from '../types';
import { CityInfo } from '../../../shared/utils/timezones';

export const TimezoneSearch: React.FC<TimezoneSearchProps> = () => {
    const { searchTerm, setSearchTerm, searchResults, selectTimezone } = useTimezoneSearch();

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleTimezoneSelect = (cityInfo: CityInfo) => {
        selectTimezone(cityInfo);
        setSearchTerm('');
    };

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Search Cities</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for a city..."
                className="w-full p-2 border rounded mb-4"
            />
            <div className="max-h-60 overflow-y-auto">
                {searchResults.size > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left">City</th>
                                <th className="text-left">Country</th>
                                <th className="text-left">Timezone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(searchResults).map((cityInfo) => (
                                <tr
                                    key={cityInfo.id}
                                    onClick={() => handleTimezoneSelect(cityInfo)}
                                    className="cursor-pointer hover:bg-gray-100"
                                >
                                    <td className="py-2">{cityInfo.city}</td>
                                    <td className="py-2">{cityInfo.country}</td>
                                    <td className="py-2">{cityInfo.timezone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No cities found. Try a different search term.</p>
                )}
            </div>
        </div>
    );
};