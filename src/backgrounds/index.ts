import { z } from 'zod'
import { StaticBackground } from './_/Static'


export const BACKGROUNDS = [
  // Add new background here
  StaticBackground,
]

type BackgroundSchema = (typeof BACKGROUNDS)[number]['schema']
export const BackgroundProps = z.discriminatedUnion(
  'type',
  BACKGROUNDS.map((bg) => bg.schema) as [BackgroundSchema, ...BackgroundSchema[]],
)
export type BackgroundProps = z.infer<typeof BackgroundProps>
