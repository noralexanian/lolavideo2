import { random } from "remotion";

export const getRandomInt = (min: number, max: number, seed: number): number => {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(random(seed) * (maxFloor - minCeil + 1)) + minCeil;
};