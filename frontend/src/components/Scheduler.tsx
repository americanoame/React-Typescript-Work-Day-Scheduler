import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { TimeBlock, timeBlocks } from '../types';
import { loadBlocksFromLocalStorage, saveBlockToLocalStorage } from '../localStorageUtils';
import TimeBlockRow from '../components/TimeBlockRow';

interface SchedulerProps {
  setReminderText: React.Dispatch<React.SetStateAction<string>>;
  reminderMinutes: number; // New prop to receive reminder minutes from App
}

const Scheduler: React.FC<SchedulerProps> = ({ setReminderText, reminderMinutes }) => {
  const [blocks, setBlocks] = useState<TimeBlock[]>(timeBlocks);

  useEffect(() => {
    // Load blocks from local storage
    const loadedBlocks = loadBlocksFromLocalStorage(timeBlocks);
    setBlocks(loadedBlocks);
  }, []);

  useEffect(() => {
    const checkUpcomingAppointments = () => {
      const now = dayjs().minute(dayjs().minute()).second(0).millisecond(0);

      let upcomingRemindersFound = false;

      blocks.forEach((block) => {
        if (block.text) {
          const appointmentTime = dayjs().hour(block.hour).minute(0).second(0).millisecond(0);
          const reminderTime = appointmentTime.subtract(reminderMinutes, 'minute');

          if (now.isAfter(reminderTime) && now.isBefore(appointmentTime)) {
            setReminderText(`Reminder: Your appointment at ${appointmentTime.format('h:mm A')} is approaching in ${reminderMinutes} minutes.`);
            upcomingRemindersFound = true;
          }
        }
      });

      if (!upcomingRemindersFound) {
        setReminderText('');
      }
    };

    const updateTimeBlocks = () => {
      const currentHour = dayjs().hour();

      // Filter out all past blocks except for the last one
      const pastBlocks = blocks.filter(block => block.hour < currentHour);
      const lastPastBlock = pastBlocks.length > 0 ? pastBlocks[pastBlocks.length - 1] : null;

      setBlocks((prevBlocks) =>
        prevBlocks
          .filter(block => block.hour >= currentHour || block.hour === lastPastBlock?.hour) // Retain only the current, future, and last past block
          .map((block) => ({
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
  }, [blocks, reminderMinutes, setReminderText]); // Include blocks in the dependencies to reflect changes
  // but i keep getting the Warning: Maximum update depth exceeded error message when i include blocks in the dependencies array
  // if removed the error goes away but the code does not work as expected

  const handleSave = (hour: number, text: string) => {
    saveBlockToLocalStorage(hour, text);
  };

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const handleChange = (hour: number, text: string) => {
    const capitalizedText = capitalizeFirstLetter(text);
    setBlocks((prevBlocks) => prevBlocks.map((block) => (block.hour === hour ? { ...block, text: capitalizedText } : block)));
  };

  const handleDelete = (hour: number) => {
    setBlocks((prevBlocks) => prevBlocks.map((block) => (block.hour === hour ? { ...block, text: '' } : block)));
    localStorage.removeItem(`hour-${hour}`);
  };

  return (
    <div>
      <div className="custom-container px-5">
        {blocks.map((block) => (
          <TimeBlockRow key={block.hour} block={block} onSave={handleSave} onChange={handleChange} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Scheduler;
