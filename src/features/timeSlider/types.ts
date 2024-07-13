// src/features/timeSlider/types.ts

/**
 * Props for the TimeSlider component.
 * Currently empty as the component doesn't accept any props.
 */
export interface TimeSliderProps {}

/**
 * Interface for the useTimeSlider hook return value.
 */
export interface TimeSliderHook {
  /** The current time offset in minutes */
  currentOffset: number;
  /** Function to update the time offset */
  setOffset: (offset: number) => void;
}
