export default function F() {
  return 'default-export';
}

export const isHoisted = (F() === 'default-export');
