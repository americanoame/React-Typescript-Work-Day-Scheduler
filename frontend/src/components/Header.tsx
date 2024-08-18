

interface HeaderProps {
  currentDay: string;
  currentHour: string;
  reminderText: string;
  setReminderMinutes: (minutes: number) => void;
  reminderMinutes: number;
}

const Header: React.FC<HeaderProps> = ({
  currentDay,
  currentHour,
  reminderText,
  setReminderMinutes,
  reminderMinutes,
}) => (
  <header className="p-1 text-center">
    {/* <h1 className="display-6">React TypeScript</h1> */}
    <h3 className="mt-4">Work Day Scheduler</h3>
    <p className="lead">Get an alert  minutes before any scheduling</p>
    <div>
      <label className="mb-3">Set Reminder Time (minutes before):</label>
      <input
        type="number"
        value={reminderMinutes}
        onChange={(e) => setReminderMinutes(Number(e.target.value))}
      />
    </div>
    <p id="currentDay" className="lead">
      {currentDay}
    </p>
    <p id="currentHour" className="lead">
      {currentHour}
    </p>
    {reminderText && <p className="lead">{reminderText}</p>}
  </header>
);

export default Header;
