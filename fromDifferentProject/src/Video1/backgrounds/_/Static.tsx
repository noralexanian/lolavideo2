import { AbsoluteFill } from 'remotion'
import { z } from 'zod'

import { Color } from '../../types'
import { defineBackground } from '../define'

export const StaticBackground = defineBackground({
  type: 'static',
  description: 'Just a background color',
  schema: z.object({ background: Color }),
  component: ({ style, background }) => {
    return <AbsoluteFill style={{ overflow: 'hidden', background, ...style }} />
  },
})
