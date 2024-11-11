import styled from "styled-components"
import MenuButton from "./MenuButton"
import { dataAtom } from "../../data/data.tsx"
import { atom, useAtom } from "jotai"
import LevelSelect, { levelSelectDisplayAtom } from "../Level/LevelSelect/LevelSelect.tsx"
import Options, { optionsDisplayAtom } from "./Options/Options.tsx"
import Language, { languageDisplayAtom } from "./Options/Language/Language.tsx"
import Upgrades, { upgradesDisplayAtom } from "./Upgrades/Upgrades.tsx"
import BackBtn, { backBtnDisplayAtom } from "./BackBtn.tsx"
import mainMenuImg from "../../assets/images/menu/mainMenu.png"
import { levelStateAtom } from "../Level/LevelState.tsx"
import { useEffect } from "react"

const MainMenuContainer = styled.section`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url(${mainMenuImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const MainMenuButtonsContainer = styled.div`
  width: 50%;
  height: 300px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: 100px;
`

const GameTitle = styled.div`
  width: 900px;
  font-size: 120px;
  font-family: 'font-game-title';
  color: #e0f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 10px;
  opacity: 0;
  transform: translateY(-50px);
  animation: frostFadeIn 1.5s ease-out forwards, iceTwinkle 2.5s ease-in-out infinite;

  @keyframes frostFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes iceTwinkle {
    0%, 100% {
      text-shadow: 
        0 0 10px #0078c2,
        0 0 20px #0078c2,
        0 0 30px #0078c2;
    }
    50% {
      text-shadow: 
        0 0 15px #ffffff,
        0 0 25px #ffffff,
        0 0 35px #0078c2;
    }
  }
`

const MenuBtnUpgradeBlock = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const mainMenuButtonsAtom = atom('flex')
export const mainMenuDisplayAtom = atom('flex')
export const gameTitleDisplayAtom = atom('flex')

type PointerEventsType = 'all' | 'none'
export const upgradeBtnPointerEventsAtom = atom<PointerEventsType>('all')
export const upgradeBtnBrightnessAtom = atom(100)

export default function MainMenu() {

  const [data] = useAtom(dataAtom)
  const [mainMenuButtons, setMainMenuButtons] = useAtom(mainMenuButtonsAtom)
  const [mainMenuDisplay] = useAtom(mainMenuDisplayAtom)
  const [gameTitleDisplay, setGameTitleDisplay] = useAtom(gameTitleDisplayAtom)
  const [, setLevelSelectDisplay] = useAtom(levelSelectDisplayAtom)
  const [, setOptionsDisplay] = useAtom(optionsDisplayAtom)
  const [, setLanguageDisplay] = useAtom(languageDisplayAtom)
  const [, setUpgradesDisplay] = useAtom(upgradesDisplayAtom)
  const [, setBackBtnDisplay] = useAtom(backBtnDisplayAtom)

  const [levelState] = useAtom(levelStateAtom)

  const [upgradeBtnPointerEvents, setUpgradeBtnPointerEvents] = useAtom(upgradeBtnPointerEventsAtom)
  const [upgradeBtnBrightness, setUpgradeBtnBrightness] = useAtom(upgradeBtnBrightnessAtom)

  useEffect(() => {
    if (levelState != 0) {
      setUpgradeBtnBrightness(50)
      setUpgradeBtnPointerEvents('none')
    } else {
      setUpgradeBtnBrightness(100)
      setUpgradeBtnPointerEvents('all')
    }
  }, [levelState])

  return (
    <MainMenuContainer 
    style={{
      display: mainMenuDisplay
    }}
    >
      <GameTitle style={{display: gameTitleDisplay}}>FROSTGUARD</GameTitle>
      <MainMenuButtonsContainer 
      style={{
        display: mainMenuButtons
      }}
      >
        <MenuButton 
        title={data.play}
        onClick={() => {
          setLevelSelectDisplay('flex')
          setGameTitleDisplay('none')
          setMainMenuButtons('none')
          setBackBtnDisplay('flex')
        }}
        />
        <MenuBtnUpgradeBlock 
        style={{
          pointerEvents: upgradeBtnPointerEvents,
          filter: `brightness(${upgradeBtnBrightness}%)`
        }}>
        <MenuButton 
        title={data.upgrades}
        onClick={() => {
          setMainMenuButtons('none')
          setUpgradesDisplay('flex')
          setBackBtnDisplay('flex')
          setGameTitleDisplay('none')
        }}
        />
        </ MenuBtnUpgradeBlock>
        <MenuButton 
        title={data.options}
        onClick={() => {
          setGameTitleDisplay('none')
          setOptionsDisplay('flex')
          setMainMenuButtons('none')
          setBackBtnDisplay('flex')
        }}
        />
      </MainMenuButtonsContainer>

      <LevelSelect />
      <Options />
      <Language />
      <Upgrades />

      <BackBtn 
      onClick={() => {
        setMainMenuButtons('flex')
        setLevelSelectDisplay('none')
        setOptionsDisplay('none')
        setLanguageDisplay('none')
        setUpgradesDisplay('none')
        setBackBtnDisplay('none')
        setGameTitleDisplay('flex')
      }}
      />
    </MainMenuContainer>
  )
}
