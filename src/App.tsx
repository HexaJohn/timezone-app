import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AppProvider } from './shared/context/AppContext';
import { CurrentTime } from './features/currentTime';
// import { TimezoneSearch } from './features/timezoneSearch';
// import { TimezoneCards } from './features/timezoneDisplay';
// import { TimeSlider } from './features/timeSlider';

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100 p-8">
        <CurrentTime />
        {/* Other components will go here */}
      </div>
    </AppProvider>
  );
};

export default App;