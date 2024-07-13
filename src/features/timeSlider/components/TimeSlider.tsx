// src/features/timeSlider/components/TimeSlider.tsx

import React from 'react';
import { useTimeSlider } from '../hooks/useTimeSlider';
import { TimeSliderProps } from '../types';

export const TimeSlider: React.FC<TimeSliderProps> = () => {
    const { currentOffset, setOffset } = useTimeSlider();

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOffset(parseInt(event.target.value, 10));
    };

    const formatOffset = (offset: number): string => {
        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        const sign = offset < 0 ? '-' : '+';
        return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    return (
        <div className="text-blue-400">
            <input
                type="range"
                min="-720"
                max="720"
                value={currentOffset}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <p className="mt-4 text-2xl font-bold">
                Current offset: <span className="text-yellow-400">{formatOffset(currentOffset)}</span>
            </p>
            <p className="text-sm text-gray-500">
                ({currentOffset} minutes)
            </p>
        </div>
    );
};