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
        <div className="text-red-400">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for a city..."
                className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded text-red-400 placeholder-gray-500"
            />
            <div className="max-h-60 overflow-y-auto">
                {searchResults.size > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="text-gray-500">
                                <th className="text-left pb-2">City</th>
                                <th className="text-left pb-2">Country</th>
                                <th className="text-left pb-2">Timezone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(searchResults).map((cityInfo) => (
                                <tr
                                    key={cityInfo.id}
                                    onClick={() => handleTimezoneSelect(cityInfo)}
                                    className="cursor-pointer hover:bg-gray-800"
                                >
                                    <td className="py-2">{cityInfo.city}</td>
                                    <td className="py-2 text-yellow-400">{cityInfo.country}</td>
                                    <td className="py-2 text-green-400">{cityInfo.timezone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-500">No cities found. Try a different search term.</p>
                )}
            </div>
        </div>
    );
};