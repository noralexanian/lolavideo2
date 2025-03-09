import { createContext, useContext, useEffect, useState } from 'react'

import { FONT_FAMILIES } from '../lib/fontFamily'
import { Font, Fonts } from '../types'

const FontContext = createContext<Record<Font, boolean>>({ primary: false, secondary: false })

export const useIsFontLoaded = (font: Font) => useContext(FontContext)[font]

export const LoadFonts = ({ children, fonts }: { children: React.ReactNode; fonts: Fonts }) => {
  const [loaded, setLoaded] = useState<Record<Font, boolean>>({ primary: false, secondary: false })

  useEffect(() => {
    for (const [font, fontFamily] of Object.entries(fonts)) {
      console.log("f", font, fontFamily);
      
      if (!fontFamily) continue
      if (loaded[font as Font]) continue

      const fn = FONT_FAMILIES[fontFamily] as () => Promise<{ loadFont: () => { waitUntilDone: () => Promise<void> } }>
      if (!fn) return console.log(`Font ${fontFamily} not found`)
      fn().then((x) =>
        x
          .loadFont()
          .waitUntilDone()
          .then(() => setLoaded((loaded) => ({ ...loaded, [font]: true }))),
      )
    }
  }, [fonts])
  return <FontContext.Provider value={loaded}>{children}</FontContext.Provider>
}
