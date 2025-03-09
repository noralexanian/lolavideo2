import { createContext, useContext } from 'react'
import { z } from 'zod'

export const VideoContextProps = z.object({
  adId: z.string(),
  baseUrl: z.string(),
})
export type VideoContextProps = z.infer<typeof VideoContextProps>

export const VideoContext = createContext<VideoContextProps>({
  adId: '',
  baseUrl: '',
})

export const useVideoContext = () => {
  const context = useContext(VideoContext)
  if (!context) throw new Error('useVideoContext must be used within a VideoContextProvider')
  return context
}
