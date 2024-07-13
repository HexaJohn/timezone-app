// src/features/timeSlider/components/TimeSlider.tsx

import React from 'react';
import { useTimeSlider } from '../hooks/useTimeSlider';
import { TimeSliderProps } from '../types';

/**
 * TimeSlider component allows users to adjust the time offset.
 * It displays a slider and the current offset value.
 *
 * @param {TimeSliderProps} props - The props for the TimeSlider component (currently empty)
 * @returns {React.ReactElement} A React element displaying the time offset slider
 */
export const TimeSlider: React.FC<TimeSliderProps> = () => {
    // Use the custom hook to get the current offset and setter function
    const { currentOffset, setOffset } = useTimeSlider();

    /**
     * Handles changes to the slider value.
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the slider input
     */
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOffset(parseInt(event.target.value, 10));
    };

    /**
     * Formats the current offset for display.
     * 
     * @param {number} offset - The current offset in minutes
     * @returns {string} A formatted string representing the offset in hours and minutes
     */
    const formatOffset = (offset: number): string => {
        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        const sign = offset < 0 ? '-' : '+';
        return `${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Time Offset</h2>
            <input
                type="range"
                min="-720"
                max="720"
                value={currentOffset}
                onChange={handleSliderChange}
                className="w-full"
            />
            <p className="mt-2">
                Current offset: {formatOffset(currentOffset)} ({currentOffset} minutes)
            </p>
        </div>
    );
};