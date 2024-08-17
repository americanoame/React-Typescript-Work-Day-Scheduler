import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { TimeBlock, timeBlocks } from '../types';
import { loadBlocksFromLocalStorage, saveBlockToLocalStorage } from '../localStorageUtils';
import TimeBlockRow from '../components/TimeBlockRow';


const Scheduler: React.FC<{ setReminderText: React.Dispatch<React.SetStateAction<string>> }> = ({ setReminderText }) => {
  const [blocks, setBlocks] = useState<TimeBlock[]>(timeBlocks);

  useEffect(() => {
    const loadedBlocks = loadBlocksFromLocalStorage(timeBlocks);
    setBlocks(loadedBlocks);

    const checkUpcomingAppointments = () => {
      const now = dayjs();
      loadedBlocks.forEach(block => {
        const appointmentTime = dayjs().hour(block.hour).minute(0).second(0);
        const reminderTime = appointmentTime.subtract(12, 'minute'); // Adjust to 30 minutes before the appointment

        if (now.isSame(reminderTime, 'minute')) {
          setReminderText(`Reminder: Your appointment at ${appointmentTime.format('h:mm A')} is approaching in 12 minutes.`);
        }
      });
    };

    const updateTimeBlocks = () => {
      const currentHour = dayjs().hour();
      setBlocks(prevBlocks =>
        prevBlocks.map(block => ({
          ...block,
          status: block.hour < currentHour ? 'past' : block.hour === currentHour ? 'present' : 'future',
        }))
      );
    };

    checkUpcomingAppointments();
    updateTimeBlocks();

    const interval = setInterval(() => {
      checkUpcomingAppointments();
      updateTimeBlocks();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const handleSave = (hour: number, text: string) => {
    saveBlockToLocalStorage(hour, text);
  };

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleChange = (hour: number, text: string) => {
    const capitalizedText = capitalizeFirstLetter(text);
    setBlocks(blocks.map(block => 
      block.hour === hour ? { ...block, text: capitalizedText } : block
    ));
  };

  return (
    <div>
      <div className="container-lg px-5">
        {blocks.map(block => (
          <TimeBlockRow key={block.hour} block={block} onSave={handleSave} onChange={handleChange} />
        ))}
      </div>
    </div>
  );
};

export default Scheduler;
