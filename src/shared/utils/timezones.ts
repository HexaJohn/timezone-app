// src/shared/utils/timezones.ts

/**
 * Gets a list of supported timezones.
 * It attempts to use Intl.supportedValuesOf if available, otherwise falls back to a common list.
 *
 * @returns {string[]} An array of timezone strings
 */
export const getSupportedTimezones = (): string[] => {
  if (typeof Intl !== "undefined" && "supportedValuesOf" in Intl) {
    return (Intl as any).supportedValuesOf("timeZone");
  }
  // Fallback to common timezones if the method is not available
  return [
    "UTC",
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Australia/Sydney",
    // Add more timezones as needed for the fallback
  ];
};

/**
 * Calculates the offset in minutes for a given timezone.
 *
 * @param {string} timezone - The timezone to calculate the offset for
 * @returns {number} The offset in minutes
 */
export const getTimezoneOffset = (timezone: string): number => {
  const date = new Date();
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
  return (tzDate.getTime() - utcDate.getTime()) / 60000;
};
