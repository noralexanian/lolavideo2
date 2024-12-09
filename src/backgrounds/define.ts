import { CSSProperties, ReactNode } from 'react'
import { z } from 'zod'

export const defineBackground = <T extends z.ZodRawShape, K extends string>(input: {
  type: K
  description: string
  schema: z.ZodObject<T>
  component: (props: z.infer<z.ZodObject<T>> & { style?: CSSProperties }) => ReactNode
}) => {
  return {
    ...input,
    schema: input.schema.extend({ type: z.literal(input.type) }).describe(input.description),
  }
}
