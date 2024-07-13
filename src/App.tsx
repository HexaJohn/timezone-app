// src/App.tsx

import React from 'react';
import { AppProvider } from './shared/context/AppContext';
import { CurrentTime } from './features/currentTime';
import { TimeSlider } from './features/timeSlider';
import { TimezoneSearch } from './features/timezoneSearch';
import { TimezoneDisplay } from './features/timezoneDisplay';

/**
 * The main App component that composes all feature components.
 * It wraps all components with the AppProvider to provide global state.
 *
 * @returns {React.ReactElement} The composed application
 */
const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">World Clock App</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <CurrentTime />
            <div className="mt-8">
              <TimeSlider />
            </div>
          </div>
          <div>
            <TimezoneSearch />
            <div className="mt-8">
              <TimezoneDisplay />
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;