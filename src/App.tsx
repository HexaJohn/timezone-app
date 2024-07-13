import React from 'react';
import { AppProvider } from './shared/context/AppContext';
import { CurrentTime } from './features/currentTime';
import { TimeSlider } from './features/timeSlider';
import { TimezoneSearch } from './features/timezoneSearch';
import { TimezoneDisplay } from './features/timezoneDisplay';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-black p-8 font-mono">
        <h1 className="text-3xl font-bold mb-8 text-center text-green-400">WORLD CLOCK</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">Current Time</h2>
            <CurrentTime />
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Time Offset</h2>
            <TimeSlider />
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-red-400">Search Cities</h2>
            <TimezoneSearch />
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Selected Timezones</h2>
            <TimezoneDisplay />
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;