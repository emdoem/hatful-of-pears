// Stack Overflow sheananigans
export const mode: any = (arr: number[]) => {
    if (arr.filter((x, index) => arr.indexOf(x) == index).length == arr.length) return arr;
    else return mode(arr
        .sort((x, index) => x - index)
        .map((x, index) => arr.indexOf(x) != index ? x : null)
        .filter(x => x != null));
};
