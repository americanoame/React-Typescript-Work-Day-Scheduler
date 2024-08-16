
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Scheduler from './components/Scheduler';

import dayjs from 'dayjs';

const App: React.FC = () => {
  const [currentDay, setCurrentDay] = useState<string>('');
  const [currentHour, setCurrentHour] = useState<string>('');

  useEffect(() => {
    // Set the current day when the component mounts
    setCurrentDay(dayjs().format('MMMM D, YYYY'));

    const interval = setInterval(() =>  {
      setCurrentHour(dayjs().format('h:mm:ss A')); // Set the current hour when the component mounts
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
    
  }, []);
  

  return (
    <div className="app-container">
      <Header currentDay={currentDay} currentHour={currentHour}  />
      <Scheduler /> 
    </div>
  );
};

export default App;
