import { CSSProperties } from "react";
import { interpolate } from "remotion";
import { AnimationConfig, ImageDimensions, Position } from "./types";

export class ImageItem {
    private readonly src: string;
    private readonly baseStyle: CSSProperties;
    private position: Position;
    private readonly index: number;
    private readonly screenWidth: number;

    constructor(
        src: string,
        index: number,
        screenWidth: number,
        dimensions: ImageDimensions,
        config: AnimationConfig
    ) {
        this.src = src;
        this.index = index;
        this.screenWidth = screenWidth;

        // Initialize base style
        this.baseStyle = {
            position: "absolute",
            borderRadius: 25,
            width: dimensions.width - 2 * config.margins.left,
            maxHeight: dimensions.height - config.margins.top * 2.1,
        };

        // Calculate initial position
        this.position = this.calculatePosition(index, config);
    }

    /**
     * Calculate position based on index and configuration
     */
    private calculatePosition(index: number, config: AnimationConfig): Position {
        return {
            top: config.margins.top + index * config.spacing.vertical,
            left: config.margins.left + index * config.spacing.horizontal
        };
    }

    /**
     * Update position based on animation progress
     */
    public updatePosition(
        progress: number,
        config: AnimationConfig
    ): void {
        if (this.index === 0) {
            // First image slides out to the left
            this.position.left = interpolate(
                progress,
                [0, 1],
                [config.margins.left, -this.screenWidth],
                { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );
        } else {
            // Other images move to previous position
            const currentPos = this.calculatePosition(this.index, config);
            const targetPos = this.calculatePosition(this.index - 1, config);

            this.position = {
                top: interpolate(
                    progress,
                    [0, 1],
                    [currentPos.top, targetPos.top],
                    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
                ),
                left: interpolate(
                    progress,
                    [0, 1],
                    [currentPos.left, targetPos.left],
                    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
                )
            };
        }
    }

    /**
     * Get computed style for rendering
     */
    public getStyle(): CSSProperties {
        return {
            ...this.baseStyle,
            ...this.position
        };
    }

    /**
     * Get image source for rendering
     */
    public getSrc(): string {
        return this.src;
    }
}