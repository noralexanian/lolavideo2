export interface AnimationConfig {
    initialDelay: number;      // Delay before the first animation starts
    waitDuration: number;
    waitGroupDuration: number; // Longer wait duration
    groupSize: number;         // Number of images before longer wait
    moveDuration: number;
    margins: {
        top: number;
        left: number;
    };
    spacing: {
        vertical: number;
        horizontal: number;
    };
}

export interface ImageDimensions {
    width: number;
    height: number;
}

export interface Position {
    top: number;
    left: number;
}
