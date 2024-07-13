// src/features/timezoneDisplay/index.ts

// Export the main component
export { TimezoneDisplay } from "./components/TimezoneDisplay";

// Export the custom hook
export { useTimezoneDisplay } from "./hooks/useTimezoneDisplay";

// Export types
export type {
  TimezoneDisplayProps,
  TimezoneCardProps,
  TimezoneDisplayHook,
} from "./types";

/**
 * This index file serves as the public API for the timezoneDisplay feature.
 * It exports the main component, custom hook, and relevant types.
 *
 * Exported items:
 * - TimezoneDisplay: The main component for displaying selected timezones
 * - useTimezoneDisplay: Custom hook for managing timezone display logic
 * - Types:
 *   - TimezoneDisplayProps: Props for the TimezoneDisplay component
 *   - TimezoneCardProps: Props for individual timezone cards
 *   - TimezoneDisplayHook: Return type of the useTimezoneDisplay hook
 */
