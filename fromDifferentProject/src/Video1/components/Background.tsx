import { CSSProperties, useMemo } from 'react'

import { BACKGROUNDS, BackgroundProps } from '../backgrounds'

export const Background = (props: BackgroundProps & { style?: CSSProperties }) => {
  const Component = useMemo(() => BACKGROUNDS.find((bg) => bg.type === props.type)?.component, [props.type])
  if (!Component) return null
  return <Component {...(props as any)} style={props.style} />
}
