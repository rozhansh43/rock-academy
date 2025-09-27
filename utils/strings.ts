const weekdaysFa = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
];

export const weekdaysToFa = (weekdays: number[] | null | undefined) => {
  if (!weekdays || !weekdays.length) return '';
  return weekdays
    .map((day) => {
      return weekdaysFa[day];
    })
    .join('، ');
};

export const isJsonString = (value: string): boolean => {
  try {
    JSON.parse(value);
  } catch {
    return false;
  }
  return true;
};

export const formatPrice = (price: number | string | null | undefined) => {
  if (!price) return '';
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
