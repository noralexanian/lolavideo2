import { useCurrentFrame } from 'remotion'
import { defaultSpring, interpolateSpring } from '../../lib/helpers'



export const TextCharsFromRightToLeft = ({ text }: { text: string }) => {
  const frame = useCurrentFrame()
  return (
    <>
      {text.split('').map((char, i) => {
        const spring = defaultSpring({ frame, delay: 6 + i * 1.1, durationInFrames: 20 })
        if (char === '\n') return <br key={i} />
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity: `${interpolateSpring(spring, [0, 1])}`,
              transform: `translateX(${interpolateSpring(spring, [200, 0])}px)`,
            }}
          >
            {char === ' ' ? <>&nbsp;</> : char}
          </span>
        )
      })}
    </>
  )
}
