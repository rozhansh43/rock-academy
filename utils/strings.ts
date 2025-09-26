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
