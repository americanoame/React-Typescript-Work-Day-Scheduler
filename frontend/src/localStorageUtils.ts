

import { TimeBlock } from './types';

export const loadBlocksFromLocalStorage = (blocks: TimeBlock[]): TimeBlock[] => {
  return blocks.map(block => {
    const savedText = localStorage.getItem(`hour-${block.hour}`);
    return { ...block, text: savedText || '' };
  });
};

export const saveBlockToLocalStorage = (hour: number, text: string): void => {
  localStorage.setItem(`hour-${hour}`, text);
};
