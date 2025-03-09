import { z } from 'zod'

import { typedObjectKeys } from './helpers'

// Got these from https://fonts.google.com/analytics with this script:
// console.log(
//   Array.from(document.querySelectorAll("gf-stat-row"))
//     .map((row) => {
//       const linkElement = row.querySelector("a");
//       return linkElement ? linkElement.textContent.trim() : null;
//     })
//     .filter(Boolean)
//     .slice(0, 100)
//     .sort((a, b) => a.localeCompare(b))
//     .map((f) => `${f.replaceAll(" ", "")}: () => import('@remotion/google-fonts/${f.replaceAll(" ", "")}'),`)
//     .join("\n")
// );

export const FONT_FAMILIES = {
  Abel: () => import('@remotion/google-fonts/Abel'),
  AbrilFatface: () => import('@remotion/google-fonts/AbrilFatface'),
  Acme: () => import('@remotion/google-fonts/Acme'),
  AmaticSC: () => import('@remotion/google-fonts/AmaticSC'),
  Anton: () => import('@remotion/google-fonts/Anton'),
  Antonio: () => import ('@remotion/google-fonts/Antonio'),
  ArchivoNarrow: () => import('@remotion/google-fonts/ArchivoNarrow'),
  ArchivoBlack: () => import('@remotion/google-fonts/ArchivoBlack'),
  Arimo: () => import('@remotion/google-fonts/Arimo'),
  Arvo: () => import('@remotion/google-fonts/Arvo'),
  Asap: () => import('@remotion/google-fonts/Asap'),
  Assistant: () => import('@remotion/google-fonts/Assistant'),
  Barlow: () => import('@remotion/google-fonts/Barlow'),
  BarlowCondensed: () => import('@remotion/google-fonts/BarlowCondensed'),
  BebasNeue: () => import('@remotion/google-fonts/BebasNeue'),
  Bitter: () => import('@remotion/google-fonts/Bitter'),
  BreeSerif: () => import('@remotion/google-fonts/BreeSerif'),
  Cabin: () => import('@remotion/google-fonts/Cabin'),
  Cairo: () => import('@remotion/google-fonts/Cairo'),
  Catamaran: () => import('@remotion/google-fonts/Catamaran'),
  Comfortaa: () => import('@remotion/google-fonts/Comfortaa'),
  CrimsonText: () => import('@remotion/google-fonts/CrimsonText'),
  Cuprum: () => import('@remotion/google-fonts/Cuprum'),
  DancingScript: () => import('@remotion/google-fonts/DancingScript'),
  DMSans: () => import('@remotion/google-fonts/DMSans'),
  Dosis: () => import('@remotion/google-fonts/Dosis'),
  EBGaramond: () => import('@remotion/google-fonts/EBGaramond'),
  Exo: () => import('@remotion/google-fonts/Exo'),
  Exo2: () => import('@remotion/google-fonts/Exo2'),
  FiraSans: () => import('@remotion/google-fonts/FiraSans'),
  FjallaOne: () => import('@remotion/google-fonts/FjallaOne'),
  FrancoisOne: () => import('@remotion/google-fonts/FrancoisOne'),
  Heebo: () => import('@remotion/google-fonts/Heebo'),
  Hind: () => import('@remotion/google-fonts/Hind'),
  HindSiliguri: () => import('@remotion/google-fonts/HindSiliguri'),
  IBMPlexSans: () => import('@remotion/google-fonts/IBMPlexSans'),
  Inconsolata: () => import('@remotion/google-fonts/Inconsolata'),
  IndieFlower: () => import('@remotion/google-fonts/IndieFlower'),
  Inter: () => import('@remotion/google-fonts/Inter'),
  JosefinSans: () => import('@remotion/google-fonts/JosefinSans'),
  Kanit: () => import('@remotion/google-fonts/Kanit'),
  Karla: () => import('@remotion/google-fonts/Karla'),
  Lato: () => import('@remotion/google-fonts/Lato'),
  LibreBaskerville: () => import('@remotion/google-fonts/LibreBaskerville'),
  LibreFranklin: () => import('@remotion/google-fonts/LibreFranklin'),
  Lobster: () => import('@remotion/google-fonts/Lobster'),
  Lora: () => import('@remotion/google-fonts/Lora'),
  Manrope: () => import('@remotion/google-fonts/Manrope'),
  MavenPro: () => import('@remotion/google-fonts/MavenPro'),
  Merriweather: () => import('@remotion/google-fonts/Merriweather'),
  MerriweatherSans: () => import('@remotion/google-fonts/MerriweatherSans'),
  Montserrat: () => import('@remotion/google-fonts/Montserrat'),
  Mukta: () => import('@remotion/google-fonts/Mukta'),
  Mulish: () => import('@remotion/google-fonts/Mulish'),
  NanumGothic: () => import('@remotion/google-fonts/NanumGothic'),
  NotoSans: () => import('@remotion/google-fonts/NotoSans'),
  NotoSansJP: () => import('@remotion/google-fonts/NotoSansJP'),
  NotoSansKR: () => import('@remotion/google-fonts/NotoSansKR'),
  NotoSansSC: () => import('@remotion/google-fonts/NotoSansSC'),
  NotoSansTC: () => import('@remotion/google-fonts/NotoSansTC'),
  NotoSerif: () => import('@remotion/google-fonts/NotoSerif'),
  Nunito: () => import('@remotion/google-fonts/Nunito'),
  NunitoSans: () => import('@remotion/google-fonts/NunitoSans'),
  OpenSans: () => import('@remotion/google-fonts/OpenSans'),
  Oswald: () => import('@remotion/google-fonts/Oswald'),
  Overpass: () => import('@remotion/google-fonts/Overpass'),
  Oxygen: () => import('@remotion/google-fonts/Oxygen'),
  Pacifico: () => import('@remotion/google-fonts/Pacifico'),
  Play: () => import('@remotion/google-fonts/Play'),
  PlayfairDisplay: () => import('@remotion/google-fonts/PlayfairDisplay'),
  PoiretOne: () => import('@remotion/google-fonts/PoiretOne'),
  Poppins: () => import('@remotion/google-fonts/Poppins'),
  Prompt: () => import('@remotion/google-fonts/Prompt'),
  PTSans: () => import('@remotion/google-fonts/PTSans'),
  PTSansCaption: () => import('@remotion/google-fonts/PTSansCaption'),
  PTSansNarrow: () => import('@remotion/google-fonts/PTSansNarrow'),
  PTSerif: () => import('@remotion/google-fonts/PTSerif'),
  Questrial: () => import('@remotion/google-fonts/Questrial'),
  Quicksand: () => import('@remotion/google-fonts/Quicksand'),
  Rajdhani: () => import('@remotion/google-fonts/Rajdhani'),
  Raleway: () => import('@remotion/google-fonts/Raleway'),
  Righteous: () => import('@remotion/google-fonts/Righteous'),
  Roboto: () => import('@remotion/google-fonts/Roboto'),
  RobotoCondensed: () => import('@remotion/google-fonts/RobotoCondensed'),
  RobotoMono: () => import('@remotion/google-fonts/RobotoMono'),
  RobotoSlab: () => import('@remotion/google-fonts/RobotoSlab'),
  Rokkitt: () => import('@remotion/google-fonts/Rokkitt'),
  Rubik: () => import('@remotion/google-fonts/Rubik'),
  ShadowsIntoLight: () => import('@remotion/google-fonts/ShadowsIntoLight'),
  Signika: () => import('@remotion/google-fonts/Signika'),
  Slabo27px: () => import('@remotion/google-fonts/Slabo27px'),
  SourceCodePro: () => import('@remotion/google-fonts/SourceCodePro'),
  Teko: () => import('@remotion/google-fonts/Teko'),
  TitilliumWeb: () => import('@remotion/google-fonts/TitilliumWeb'),
  Ubuntu: () => import('@remotion/google-fonts/Ubuntu'),
  UbuntuCondensed: () => import('@remotion/google-fonts/UbuntuCondensed'),
  VarelaRound: () => import('@remotion/google-fonts/VarelaRound'),
  Vollkorn: () => import('@remotion/google-fonts/Vollkorn'),
  WorkSans: () => import('@remotion/google-fonts/WorkSans'),
  YanoneKaffeesatz: () => import('@remotion/google-fonts/YanoneKaffeesatz'),
}

const [first, ...rest] = typedObjectKeys(FONT_FAMILIES)

export const FontFamily = z.enum([first!, ...rest]).catch('Roboto')
export type FontFamily = z.infer<typeof FontFamily>
