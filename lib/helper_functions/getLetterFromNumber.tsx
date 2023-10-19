'use client';
export const getLetterFromNumber = (n: number) => {
  const letters = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));
  return letters[n];
};
