export function getLuckyNumber(range: number): number {
    const luckyNumber = Math.ceil(Math.random() * range)
    return luckyNumber;
}