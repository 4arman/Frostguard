import styled from "styled-components"
import MenuButton from "./MenuButton"
import { atom, useAtom } from "jotai"
import { dataAtom } from "../../data/data.tsx"
import Options, { optionsDisplayAtom } from "./Options/Options.tsx"
import BackBtn, { backBtnDisplayAtom } from "./BackBtn.tsx"
import { damageNumbersOpacityAtom, levelDamageRecievedStatisticAtom, levelTurnsStatisticAtom, turnOpacityAtom } from "../Level/Turn.tsx"
import { loadingScreenOpacityAtom, loadingScreenPointerEventsAtom } from "../Screens/LoadingScreen.tsx"
import { level1DisplayAtom } from "../Level/Levels/Level1.tsx"
import { level2DisplayAtom } from "../Level/Levels/Level2.tsx"
import { level3DisplayAtom } from "../Level/Levels/Level3.tsx"
import { mainMenuDisplayAtom } from "./MainMenu.tsx"
import { currentMusicAtom, levelSelectDisplayAtom } from "../Level/LevelSelect/LevelSelect.tsx"
import { enemySkipTurnsAtom, skillsContainerBrightnessAtom, skillsContainerPointerEventsAtom, swordStrikeBasicDamageAtom } from "../Action Bar/Skills/Skills.tsx"
import { guardImgAtom } from "../Guard/Guard.tsx"
import { frostHPatom } from "../Action Bar/HP/FrostHP.tsx"
import { newFrostHpAtom } from "./Upgrades/Upgrades.tsx"
import { enemy1HPatom } from "../Action Bar/HP/Enemy1HP.tsx"
import { enemy2HPatom } from "../Action Bar/HP/Enemy2HP.tsx"
import { enemy3HPatom } from "../Action Bar/HP/Enemy3HP.tsx"
import { loseScreenOpacityAtom, loseScreenPointerEventsAtom } from "../Screens/LoseScreen/LoseScreen.tsx"
import menuThemeMusic from "../../assets/sounds/music/menuTheme.mp3"
import GuardImg from "../../assets/images/guard/guard.gif"

const GameMenuContainer = styled.section`
  width: 60%;
  height: 60%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(0, 43, 54, 0.9);
  border: 2px solid rgb(173, 216, 230);
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(173, 216, 230, 0.5);
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: top 600ms ease-in-out;
  color: #fff;
`

const GameMenuButtons = styled.section`
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const gameMenuDisplayAtom = atom('none')
export const gameMenuButtonsAtom = atom('flex')
export const gameMenuTopAtom = atom(100)
export default function GameMenu() {

  const [gameMenuDisplay] = useAtom(gameMenuDisplayAtom)
  const [data] = useAtom(dataAtom)
  const [gameMenuButtonsDisplay, setGameMenuButtonsDisplay] = useAtom(gameMenuButtonsAtom)
  const [gameMenuTop, setGameMenuTop] = useAtom(gameMenuTopAtom)
  const [, setOptionsDisplay] = useAtom(optionsDisplayAtom)
  const [, setTurnOpacity] = useAtom(turnOpacityAtom)
  const [, setLoadingScreenOpacity] = useAtom(loadingScreenOpacityAtom)
  const [, setLoadingScreenPointerEvents] = useAtom(loadingScreenPointerEventsAtom)
  const [, setLevel1Display] = useAtom(level1DisplayAtom)
  const [, setLevel2Display] = useAtom(level2DisplayAtom)
  const [, setLevel3Display] = useAtom(level3DisplayAtom)
  const [, setMainMenuDisplay] = useAtom(mainMenuDisplayAtom)
  const [, setGameMenuDisplay] = useAtom(gameMenuDisplayAtom)
  const [, setLevelSelectDisplay] = useAtom(levelSelectDisplayAtom)
  const [, setBackBtnDisplay] = useAtom(backBtnDisplayAtom)
  const [, setSkillContainerPointerEvents] = useAtom(skillsContainerPointerEventsAtom)
  const [, setSkillContainerBrightness] = useAtom(skillsContainerBrightnessAtom)
  const [, setDamageNumbersOpacity] = useAtom(damageNumbersOpacityAtom)
  const [, setCurrentMusic] = useAtom(currentMusicAtom)
  const [, setLoseScreenOpacity] = useAtom(loseScreenOpacityAtom)
  const [, setLoseScreenPointerEvents] = useAtom(loseScreenPointerEventsAtom)
  const [, setEnemy1HP] = useAtom(enemy1HPatom)
  const [, setEnemy2HP] = useAtom(enemy2HPatom)
  const [, setEnemy3HP] = useAtom(enemy3HPatom)
  const [, setFrostHP] = useAtom(frostHPatom)
  const [newFrostHP] = useAtom(newFrostHpAtom)
  const [, setSwordStrikeDamage] = useAtom(swordStrikeBasicDamageAtom)
  const [, setLevelTurnsStatistic] = useAtom(levelTurnsStatisticAtom)
  const [, setLevelDamageRecievedStatistic] = useAtom(levelDamageRecievedStatisticAtom)
  const [, setEnemySkipTurns] = useAtom(enemySkipTurnsAtom)
  const [, setGuardImg] = useAtom(guardImgAtom)

  return (
    <GameMenuContainer 
    style={{
      display: gameMenuDisplay,
      top: `${gameMenuTop}%`
    }}
    >
      <GameMenuButtons
      style={{
        display: gameMenuButtonsDisplay
      }}
      >
        <MenuButton 
        title={data.continue}
        onClick={() => {
          setGameMenuTop(100)
          setTurnOpacity(100)
          setSkillContainerPointerEvents('all')
          setSkillContainerBrightness(100)
          setDamageNumbersOpacity(1)
        }}
        />
        <MenuButton 
        title={data.restart}
        onClick={() => {
          setTimeout(() => {
            setEnemy1HP(100)
            setEnemy2HP(120)
            setEnemy3HP(150)
            setFrostHP(newFrostHP - 15)
            setEnemySkipTurns(0)
          }, 500)
          setTimeout(() => {
            setLoseScreenOpacity(0)
            setLoseScreenPointerEvents('none')
            setGameMenuTop(100)
            setTurnOpacity(100)
            setSkillContainerPointerEvents('all')
            setSkillContainerBrightness(100)
            setDamageNumbersOpacity(1)
          }, 1000)
          setLoadingScreenOpacity(1)
          setLoadingScreenPointerEvents('all')
          setTimeout(() => {
            setLoadingScreenOpacity(0)
            setLoadingScreenPointerEvents('none')
          }, 6500)
          setTimeout(() => {
            setGuardImg(GuardImg)
            let swordStrikeBasicDamage = Math.floor(Math.random() * (10 - 6 + 1)) + 6
            setSwordStrikeDamage(swordStrikeBasicDamage)
            setLevelTurnsStatistic(0)
            setLevelDamageRecievedStatistic(0)
          }, 1500)
        }}
        />
        <MenuButton 
        title={data.options}
        onClick={() => {
          setGameMenuButtonsDisplay('none')
          setOptionsDisplay('flex')
          setBackBtnDisplay('flex')
        }}
        />
        <MenuButton 
        title={data.mainMenu}
        onClick={() => {
          setLoadingScreenOpacity(1)
          setLoadingScreenPointerEvents('all')
          setTimeout(() => {
            setLoadingScreenOpacity(0)
            setLoadingScreenPointerEvents('none')
          }, 6500)
          setTimeout(() => setCurrentMusic(menuThemeMusic), 3250)
          setTimeout(() => {
            setLevel1Display('none')
            setLevel2Display('none')
            setLevel3Display('none')
            setMainMenuDisplay('flex')
            setGameMenuDisplay('none')
            setGameMenuTop(100)
            setTurnOpacity(100)
            setLevelSelectDisplay('flex')
            setBackBtnDisplay('flex')
            setSkillContainerBrightness(100)
            setSkillContainerPointerEvents('all')
          }, 1500)
        }}
        />
      </GameMenuButtons>

      <Options />
      <BackBtn 
      onClick={() => {
        setOptionsDisplay('none')
        setGameMenuButtonsDisplay('flex')
        setBackBtnDisplay('none')
      }}
      />
    </GameMenuContainer>
  )
}
