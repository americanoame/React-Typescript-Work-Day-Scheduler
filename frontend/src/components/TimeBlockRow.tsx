

import { TimeBlock } from '../types';

interface TimeBlockRowProps {
  block: TimeBlock;
  onSave: (hour: number, text: string) => void;
  onChange: (hour: number, text: string) => void;
}

const TimeBlockRow: React.FC<TimeBlockRowProps> = ({ block, onSave, onChange }) => {
  const formatHour = (hour: number) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour}${period}`;
  };

  return (
    <div key={block.hour} className={`row time-block ${block.status}`}>
      <div className="col-2 col-md-1 hour text-center py-3">{formatHour(block.hour)}</div>
      <textarea
        className="col-8 col-md-10 description"
        rows={3}
        value={block.text}
        onChange={(e) => onChange(block.hour, e.target.value)}
      />
      <button
        className="btn saveBtn col-2 col-md-1"
        aria-label="save"
        onClick={() => onSave(block.hour, block.text)}
      >
        <i className="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default TimeBlockRow;
