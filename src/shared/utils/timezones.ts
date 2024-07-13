import cityTimezones from "city-timezones";

export interface CityInfo {
  id: number;
  city: string;
  country: string;
  timezone: string;
}

export const getCitiesAndTimezones = (): CityInfo[] => {
  const cityMapping = cityTimezones.cityMapping || [];
  return cityMapping.map((city, index) => ({
    id: index,
    city: city.city,
    country: city.country,
    timezone: city.timezone,
  }));
};

export const getTimezoneOffset = (timezone: string): number => {
  const date = new Date();
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone: timezone }));
  return (tzDate.getTime() - utcDate.getTime()) / 60000;
};
