// src/features/currentTime/types.ts

/**
 * Props for the CurrentTime component.
 * Currently empty as the component doesn't accept any props.
 */
export interface CurrentTimeProps {}

/**
 * Interface for the useCurrentTime hook return value.
 */
export interface CurrentTimeHook {
  /** The current time */
  currentTime: Date;
  /** The time adjusted by the offset from the TimeSlider */
  adjustedTime: Date;
  /** The currently selected timezone */
  timezone: string;
  /** Function to update the selected timezone */
  setTimezone: (timezone: string) => void;
}
