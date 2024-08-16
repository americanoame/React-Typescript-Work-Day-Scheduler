interface HeaderProps {
  currentDay: string;
  currentHour: string;
}

const Header: React.FC<HeaderProps> = ({ currentDay, currentHour }) => (
  <header className="p-1 text-center">
    <h1 className="display-6">React TypeScript</h1>
    <h3>Daly Task Alert</h3>
    <p className="lead">Get an alert 30 minutes before any scheduling</p>
    <p id="currentDay" className="lead">
      {currentDay}
    </p>
    <p id="currentHour" className="lead">
      {currentHour}
    </p>
  </header>
);

export default Header;
