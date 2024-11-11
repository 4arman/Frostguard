import React from "react"
import styled from "styled-components"

import useSound from 'use-sound'
import soundHoverMenuBtn from '../../../assets/sounds/menu/hoverBtn.wav'
import soundClickMenuBtn from '../../../assets/sounds/menu/clickBtn.wav'
import { useAtom } from "jotai"
import { dataAtom } from "../../../data/data"
import { mainMenuDisplayAtom } from "../../Menu/MainMenu"
import { gameMenuDisplayAtom } from "../../Menu/GameMenu"
import { backBtnDisplayAtom } from "../../Menu/BackBtn"
import { loadingScreenOpacityAtom, loadingScreenPointerEventsAtom } from "../../Screens/LoadingScreen"

const LevelSelectButtonItem = styled.button`
  width: 20%;
  height: 100px;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
  border: 3px solid #2a3b58;
  background: linear-gradient(145deg, #436b95, #2a3b58);
  color: #d2f1fc;
  box-shadow: 0 0 20px rgba(65, 105, 225, 0.7), inset 0 0 10px rgba(255, 255, 255, 0.1);

  &:hover {
    box-shadow: 0 0 35px rgba(173, 216, 230, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3);
    background: linear-gradient(145deg, #2a3b58, #436b95);
    color: #e0f7fa;
    height: 110px;
  }

  &:active {
    box-shadow: 0 0 45px rgba(173, 216, 230, 0.9), inset 0 0 25px rgba(255, 255, 255, 0.4);
    background: linear-gradient(145deg, #1b293b, #3e6b95);
    color: #ffffff;
    border: 5px solid #ffffff;
  }
`

type PointerEventsType = 'all' | 'none'

interface LevelSelectButtonProps {
  levelNumber: number,
  onClick: any,
  pointerEvents: PointerEventsType,
  brightness: number
}

const LevelSelectButton: React.FC<LevelSelectButtonProps> = ({ 
  levelNumber, onClick, pointerEvents, brightness
}) => {

  const [data] = useAtom(dataAtom)
  const [, setMainMenuDisplay] = useAtom(mainMenuDisplayAtom)
  const [, setGameMenuDisplay] = useAtom(gameMenuDisplayAtom)
  const [, setBackBtnDisplay] = useAtom(backBtnDisplayAtom)
  const [, setLoadingScreenOpacityAtom] = useAtom(loadingScreenOpacityAtom)
  const [, setLoadingScreenPointerEvents] = useAtom(loadingScreenPointerEventsAtom)

  const [playSoundHoverMenuBtn] = useSound(soundHoverMenuBtn)
  const [playSoundClickMenuBtn] = useSound(soundClickMenuBtn)

  return (
    <LevelSelectButtonItem 
    onClick={() => {
      playSoundClickMenuBtn()
      setLoadingScreenOpacityAtom(1)
      setLoadingScreenPointerEvents('all')
      setTimeout(() => {
        setMainMenuDisplay('none')
      }, 1000)
      setTimeout(() => {
        onClick()
        setGameMenuDisplay('flex')
        setBackBtnDisplay('none')
      }, 3000)
      setTimeout(() => {
        setLoadingScreenOpacityAtom(0)
        setLoadingScreenPointerEvents('none')
      }, 6000)
    }}
    onMouseEnter={() => {
      playSoundHoverMenuBtn()
    }}
    style={{
      pointerEvents: pointerEvents,
      filter: `brightness(${brightness}%)`
    }}
    >
      {data.level} {levelNumber}
    </LevelSelectButtonItem>
  )
}


export default LevelSelectButton
