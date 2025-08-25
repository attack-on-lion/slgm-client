export const returnPoint = (day: number) => {
  if (day <= 3) return 500;
  if (day <= 7) return 1200;
  if (day <= 14) return 2500;
  return 5000;
};