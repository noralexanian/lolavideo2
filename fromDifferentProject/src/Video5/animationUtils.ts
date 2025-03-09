import { AnimationConfig } from "./types";

/**
 * Calculate the total duration of sliding animations
 * @param totalImages - Total number of images to animate
 * @param config - Animation configuration
 * @returns Total number of frames needed for all animations
 */
export const calculateSlidingDuration = (totalImages: number, config: AnimationConfig): number => {
    if (totalImages === 0) return 0;

    let totalFrames = config.initialDelay;

    totalFrames += (totalImages - 1) * (config.moveDuration + config.waitDuration) +
        (config.waitGroupDuration * (Math.floor(totalImages / config.groupSize) - 1));

    return totalFrames;
};
