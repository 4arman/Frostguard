import styled from "styled-components"
import { atom, useAtom } from "jotai"
import { dataAtom } from "../../../data/data.tsx"
import { languageDisplayAtom } from "./Language/Language.tsx"
import MusicBtn from "./MusicBtn"

const OptionsContainer = styled.section`
  width: 600px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  background: linear-gradient(135deg, #102941, #194361);
  border: 3px solid #809fae;
  border-radius: 15px;
  color: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.6);

  div {
    font-size: 28px;
    color: #c4d9e5;
    margin-bottom: 30px;
    position: relative;
    bottom: 70px;
    text-shadow: 1px 1px 2px #102941;
    cursor: pointer;
    transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
  }
`

const LanguageSectionBtn = styled.button`
  width: 100px;
  height: 60px;
  font-size: 20px;
  background: linear-gradient(145deg, #4a6073, #8fb2d4);
  color: #e0f7fa;
  box-shadow: 0 0 15px rgba(42, 111, 154, 0.7), inset 0 0 10px rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  border: 2px solid rgba(180, 220, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
  position: absolute;
  right: 1%;
  top: 1%;

  &:hover {
    box-shadow: 0 10px 25px rgba(42, 111, 154, 0.7), inset 0 0 15px rgba(255, 255, 255, 0.3);
    background: linear-gradient(145deg, #92c5e5, #4a6073);
    color: #aee1f6;
  }
  &:active {
    box-shadow: 0 10px 25px rgba(42, 111, 154, 0.7), inset 0 0 20px rgba(255, 255, 255, 0.4);
    background: linear-gradient(145deg, #739db3, #3b5063);
    color: #aee1f6;
  }
`


export const optionsDisplayAtom = atom('none')

export default function Options() {

  const [data] = useAtom(dataAtom)
  const [optionsDisplay, setOptionsDisplay] = useAtom(optionsDisplayAtom)
  const [, setLanguageDisplay] = useAtom(languageDisplayAtom)

  return (
    <OptionsContainer
    style={{
      display: optionsDisplay
    }}
    >
      <div style={{fontFamily: 'font-game-title'}}>{data.options}</div>
       <MusicBtn />
       <LanguageSectionBtn
       onClick={() => {
        setOptionsDisplay('none')
        setLanguageDisplay('flex')
       }}
       >
        {data.language}
       </LanguageSectionBtn>
    </OptionsContainer>
  )
}
