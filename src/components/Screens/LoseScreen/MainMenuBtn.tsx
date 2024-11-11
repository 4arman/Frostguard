import styled from "styled-components"
import { useAtom } from "jotai"
import { dataAtom } from "../../../data/data"
import { levelDamageRecievedStatisticAtom, levelTurnsStatisticAtom, turnOpacityAtom } from "../../Level/Turn"
import { enemy1HPatom } from "../../Action Bar/HP/Enemy1HP"
import { frostHPatom } from "../../Action Bar/HP/FrostHP"
import { newFrostHpAtom } from "../../Menu/Upgrades/Upgrades"
import { loadingScreenOpacityAtom, loadingScreenPointerEventsAtom } from "../LoadingScreen"
import { loseScreenOpacityAtom, loseScreenPointerEventsAtom } from "../LoseScreen/LoseScreen"
import { skillsContainerBrightnessAtom, skillsContainerPointerEventsAtom, swordStrikeBasicDamageAtom } from "../../Action Bar/Skills/Skills"
import { levelStateAtom } from "../../Level/LevelState"
import { level1DisplayAtom } from "../../Level/Levels/Level1"
import { level2DisplayAtom } from "../../Level/Levels/Level2"
import { level3DisplayAtom } from "../../Level/Levels/Level3"
import { currentMusicAtom, levelSelectDisplayAtom } from "../../Level/LevelSelect/LevelSelect"
import { backBtnDisplayAtom } from "../../Menu/BackBtn"
import { mainMenuDisplayAtom } from "../../Menu/MainMenu"
import { gameMenuDisplayAtom, gameMenuTopAtom } from "../../Menu/GameMenu"
import { guardImgAtom } from "../../Guard/Guard"
import GuardImg from "../../../assets/images/guard/guard.gif"
import menuThemeMusic from "../../../assets/sounds/music/menuTheme.mp3"

const MainMenuButtonItem = styled.button`
  width: 20%;
  height: 100px;
  font-size: 20px;
  background: linear-gradient(90deg, #217bc5, #3699ea);
  color: #e0f7fa;
  border-radius: 8px;
  border: 2px solid #18588d;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background: linear-gradient(90deg, #2d9bf6, #18588d);
    color: #aee1f6;
  }
  &:active {
    background: linear-gradient(90deg, #1b6db0, #5eb6ff);
    color: #aee1f6;
  }
`

export default function MainMenuBtn () {

  const [data] = useAtom(dataAtom)
  const [, setLoadingScreenOpacity] = useAtom(loadingScreenOpacityAtom)
  const [, setLoadingScreenPointerEvents] = useAtom(loadingScreenPointerEventsAtom)
  const [, setLoseScreenOpacity] = useAtom(loseScreenOpacityAtom)
  const [, setLoseScreenPointerEvents] = useAtom(loseScreenPointerEventsAtom)
  const [, setEnemy1HP] = useAtom(enemy1HPatom)
  const [, setFrostHP] = useAtom(frostHPatom)
  const [newFrostHP] = useAtom(newFrostHpAtom)
  const [, setSwordStrikeDamage] = useAtom(swordStrikeBasicDamageAtom)
  const [, setLevelTurnsStatistic] = useAtom(levelTurnsStatisticAtom)
  const [, setLevelDamageRecievedStatistic] = useAtom(levelDamageRecievedStatisticAtom)
  const [, setGuardImg] = useAtom(guardImgAtom)
  const [, setLevelState] = useAtom(levelStateAtom)
  const [, setLevel1Display] = useAtom(level1DisplayAtom)
  const [, setLevel2Display] = useAtom(level2DisplayAtom)
  const [, setLevel3Display] = useAtom(level3DisplayAtom)
  const [, setLevelSelectDisplay] = useAtom(levelSelectDisplayAtom)
  const [, setBackBtnDisplay] = useAtom(backBtnDisplayAtom)
  const [, setCurrentMusic] = useAtom(currentMusicAtom)
  const [, setMainMenuDisplay] = useAtom(mainMenuDisplayAtom)
  const [, setGameMenuDisplay] = useAtom(gameMenuDisplayAtom)
  const [, setGameMenuTop] = useAtom(gameMenuTopAtom)
  const [, setTurnOpacity] = useAtom(turnOpacityAtom)
  const [, setSkillContainerPointerEvents] = useAtom(skillsContainerPointerEventsAtom)
  const [, setSkillContainerBrightness] = useAtom(skillsContainerBrightnessAtom)

  return (
    <MainMenuButtonItem
    onClick={() => {
      setTimeout(() => {
        setEnemy1HP(100)
        setFrostHP(newFrostHP - 15)
      }, 500)
      setTimeout(() => {
        setLoseScreenOpacity(0)
        setLoseScreenPointerEvents('none')
        setLevelState(0)
      }, 1000)
      setTimeout(() => setCurrentMusic(menuThemeMusic), 3250)
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
        setLevel1Display('none')
        setLevel2Display('none')
        setLevel3Display('none')
        setGameMenuDisplay('none')
        setMainMenuDisplay('flex')
        setGameMenuTop(100)
        setTurnOpacity(100)
        setLevelSelectDisplay('flex')
        setBackBtnDisplay('flex')
        setSkillContainerBrightness(100)
        setSkillContainerPointerEvents('all')
      }, 1500)
    }}
    >
      {data.mainMenu}
    </MainMenuButtonItem>
  )
}
