export interface TimeBlock {
  hour: number;
  text: string;
  status?: 'past' | 'present' | 'future';
}

export const timeBlocks: TimeBlock[] = [
  { hour: 8, text: '' },  // 8 AM
  { hour: 9, text: '' },  // 9 AM
  { hour: 10, text: '' }, // 10 AM
  { hour: 11, text: '' }, // 11 AM
  { hour: 12, text: '' }, // 12 PM
  { hour: 13, text: '' }, // 1 PM
  { hour: 14, text: '' }, // 2 PM
  { hour: 15, text: '' }, // 3 PM
  { hour: 16, text: '' }, // 4 PM
  { hour: 17, text: '' }, // 5 PM
  { hour: 18, text: '' }, // 6 PM
  { hour: 19, text: '' }, // 6 PM
  { hour: 20, text: '' }, // 6 PM
  { hour: 21, text: '' }, // 6 PM
  { hour: 22, text: '' }, // 6 PM
  { hour: 23, text: '' }, // 6 PM
  { hour: 24, text: '' }, // 6 PM
];


