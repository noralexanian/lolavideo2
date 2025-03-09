import { z } from 'zod';
import { FontFamily } from './lib/fontFamily';
import { zColor } from '@remotion/zod-types';
import { ComponentType } from 'react';

export const Fonts = z.object({
  primary: FontFamily,
  secondary: FontFamily.optional(),
});
export type Fonts = z.infer<typeof Fonts>;

export const Font = z.enum(['primary', 'secondary']);
export type Font = z.infer<typeof Font>;

export const Colors = z
  .object({
    primary: zColor(),
    primaryText: zColor(),
    secondary: zColor(),
    secondaryText: zColor(),
    accent: zColor(),
    accentText: zColor(),
    background: zColor(),
    backgroundText: zColor(),
    black: zColor(),
    white: zColor(),
  })
  .describe('Hex color pallete for the video');

export const ColorEnum = z.enum([
  'primary',
  'primaryText',
  'secondary',
  'secondaryText',
  'accent',
  'accentText',
  'background',
  'backgroundText',
  'black',
  'white',
]);
export const ColorHex = z.custom<`#${string}`>((val: any) => /^#[0-9A-F]{6}$/i.test(val));
export const Color = z.union([ColorHex, ColorEnum]);
export type Color = z.infer<typeof Color>;

export interface VideoTemplate {
  id: string;
  component: ComponentType<any>;
  schema: z.ZodType<any>;
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
  defaultProps: any;
}