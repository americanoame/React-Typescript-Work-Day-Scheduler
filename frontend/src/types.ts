export interface TimeBlock {
  hour: number;
  text: string;
  status?: 'past' | 'present' | 'future';
}

export const timeBlocks: TimeBlock[] = [
  { hour: 18, text: '' }, // 6 PM
  { hour: 19, text: '' }, // 7 PM
  { hour: 20, text: '' }, // 8 PM
  { hour: 21, text: '' }, // 9 PM
  { hour: 22, text: '' }, // 10 PM
  { hour: 23, text: '' }, // 11 PM
];


