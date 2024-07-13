// src/App.tsx

import React from 'react';
import { AppProvider } from './shared/context/AppContext';
import { CurrentTime } from './features/currentTime';
import { TimeSlider } from './features/timeSlider';

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
        <CurrentTime />
        <div className="mt-4">
          <TimeSlider />
        </div>
        {/* Other components will go here */}
      </div>
    </AppProvider>
  );
};

export default App;