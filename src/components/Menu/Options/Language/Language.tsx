import styled from "styled-components"
import LanguageBtn from "./LanguageBtn"

import { atom, useAtom } from "jotai"
import { dataEng } from "../../../../data/dataEng"
import { dataSpain } from "../../../../data/dataSpain"
import { dataRus } from "../../../../data/dataRus"
import { dataJpn } from "../../../../data/dataJpn"

const LanguageContainer = styled.section`
  width: 700px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: linear-gradient(145deg, #2d4754, #1c3d54);
  border: 3px solid rgba(130, 180, 200, 0.7);
  border-radius: 20px;
  color: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 150, 255, 0.7), inset 0 0 15px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  overflow: hidden;
  padding: 30px;
  transition: all 0.4s ease;
  position: relative;
`

const CurrentLangTextItem = styled.div`
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  position: absolute;
  bottom: 10px;
  left: 10px;
`

export const languageDisplayAtom = atom('none')
export const currentLangTextAtom = atom('English')

export default function Language() {

  const [languageDisplay] = useAtom(languageDisplayAtom)
  const [currentLanguageText] = useAtom(currentLangTextAtom)

  return (
    <LanguageContainer
    style={{
      display: languageDisplay
    }}
    >
      <CurrentLangTextItem>Current Language: {currentLanguageText}</CurrentLangTextItem>
        <LanguageBtn
        title="English"
        language={dataEng}
        />
        <LanguageBtn
        title="Español"
        language={dataSpain}
        />
        <LanguageBtn
        title="Русский"
        language={dataRus}
        />
        <LanguageBtn
        title="日本語"
        language={dataJpn}
        />
    </LanguageContainer>
  )
}
