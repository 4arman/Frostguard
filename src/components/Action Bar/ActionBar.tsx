import styled from "styled-components"
import Skills, { skillsContainerBrightnessAtom, skillsContainerPointerEventsAtom } from "./Skills/Skills"
import FrostHP from "./HP/FrostHP"
// import EnemySkills from "./Skills/EnemySkills"
import Enemy1HP from "./HP/Enemy1HP"
import Enemy2HP from "./HP/Enemy2HP"
import Enemy3HP from "./HP/Enemy3HP"
import { atom, useAtom } from "jotai"
import { dataAtom } from "../../data/data"
import { damageNumbersOpacityAtom, turnOpacityAtom } from "../Level/Turn"

import soundGameMenuBtnHover from "../../assets/sounds/menu/backBtnHover.mp3"
import { mainMenuDisplayAtom } from "../Menu/MainMenu"
import { gameMenuTopAtom } from "../Menu/GameMenu"
import useSound from "use-sound"

const ActionBarContainer = styled.div`
  width: 100%;
  height: 35%;
  background: linear-gradient(135deg, #2169e4, #ad1d1d);
  border-top: 4px solid #ffffff;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.7), 0 0 15px rgba(80, 136, 185, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e0f7fa;
  overflow: hidden;
  position: absolute;
  z-index: 20;
  bottom: 0;
`

const HeroSideContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-right: 5px solid #385a70;
`

const EnemySideContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const GameMenuButton = styled.div`
  position: absolute;
  right: 2%;
  bottom: 8%;
  z-index: 21;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8
  }
  &:active {
    opacity: 0.6
  }
`

type PointerEventsType = 'all' | 'none'
export const gameMenuButtonAtom = atom<PointerEventsType>('all')

export default function ActionBar() {

  const [data] = useAtom(dataAtom)
  const [, setTurnOpacity] = useAtom(turnOpacityAtom)
  const [gameMenuButtonPointerEvents] = useAtom(gameMenuButtonAtom)
  const [, setDamageNumbersOpacity] = useAtom(damageNumbersOpacityAtom)
  const [, setMainMenuDisplay] = useAtom(mainMenuDisplayAtom)
  const [, setGameMenuTop] = useAtom(gameMenuTopAtom)
  const [, setSkillContainerPointerEvents] = useAtom(skillsContainerPointerEventsAtom)
  const [, setSkillsContainerBrightness] = useAtom(skillsContainerBrightnessAtom)
  const [playSoundGameMenuBtnHover] = useSound(soundGameMenuBtnHover)

  return (
    <ActionBarContainer>
      <HeroSideContainer>
        <Skills />
        <FrostHP />
      </HeroSideContainer>
      
      <EnemySideContainer>
        {/* <EnemySkills /> */}
        <Enemy1HP />
        <Enemy2HP />
        <Enemy3HP />
      </EnemySideContainer>
      <GameMenuButton
      style={{pointerEvents: gameMenuButtonPointerEvents}}
      onClick={() => {
        setGameMenuTop(25)
        setMainMenuDisplay('none')
        setTurnOpacity(0)
        setSkillContainerPointerEvents('none')
        setSkillsContainerBrightness(30)
        setDamageNumbersOpacity(0)
      }}
      onMouseEnter={() => playSoundGameMenuBtnHover()}
      >
        {data.menu}
      </GameMenuButton>
    </ActionBarContainer>
  )
}
