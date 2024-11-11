import styled from "styled-components"
import { useAtom } from "jotai"
import { useState } from "react"
import { dataAtom } from "../../../data/data"
import { levelStateAtom } from "../../Level/LevelState"
import { level1DisplayAtom } from "../../Level/Levels/Level1"
import { level2DisplayAtom } from "../../Level/Levels/Level2"
import { level3DisplayAtom } from "../../Level/Levels/Level3"
import { currentMusicAtom, level1SelectBtnBrightnessAtom, level1SelectBtnPointerEventsAtom, level2SelectBtnBrightnessAtom, level2SelectBtnPointerEventsAtom, level3SelectBtnBrightnessAtom, level3SelectBtnPointerEventsAtom, level4SelectBtnBrightnessAtom, level4SelectBtnPointerEventsAtom, levelSelectDisplayAtom } from "../../Level/LevelSelect/LevelSelect"
import { backBtnDisplayAtom } from "../../Menu/BackBtn"
import { mainMenuDisplayAtom } from "../../Menu/MainMenu"
import { gameMenuDisplayAtom } from "../../Menu/GameMenu"
import { winScreenOpacityAtom, winScreenPointerEventsAtom } from "./WinScreen"
import { levelTurnsStatisticAtom, levelDamageRecievedStatisticAtom, turnAtom } from "../../Level/Turn"
import { enemy1HPatom, enemy1HpDisplayAtom } from "../../Action Bar/HP/Enemy1HP"
import { enemy2HPatom, enemy2HpDisplayAtom } from "../../Action Bar/HP/Enemy2HP"
import { enemy3HPatom, enemy3HpDisplayAtom } from "../../Action Bar/HP/Enemy3HP"
import { frostHPatom } from "../../Action Bar/HP/FrostHP"
import { newFrostHpAtom } from "../../Menu/Upgrades/Upgrades"
import { loadingScreenOpacityAtom, loadingScreenPointerEventsAtom } from "../LoadingScreen"
import { frostcoinsAtom } from "../../Menu/Upgrades/Currency/Frostcoins"
import menuThemeMusic from "../../../assets/sounds/music/menuTheme.mp3"

const ContinueButtonItem = styled.button`
  width: 20%;
  height: 100px;
  font-size: 20px;
  background: linear-gradient(90deg, #2b6f9a, #5a9fe8);
  color: #e0f7fa;
  border-radius: 8px;
  border: 2px solid #2b6f9a;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background: linear-gradient(90deg, #5a9fe8, #2b6f9a);
    color: #aee1f6;
  }
  &:active {
    background: linear-gradient(90deg, #3e7bb3, #73b3f0);
    color: #aee1f6;
  }
`

export default function ContinueButton() {
  const [data] = useAtom(dataAtom)
  const [, setTurn] = useAtom(turnAtom)
  const [, setLevelState] = useAtom(levelStateAtom)
  const [, setLoadingScreenOpacity] = useAtom(loadingScreenOpacityAtom)
  const [, setLoadingScreenPointerEvents] = useAtom(loadingScreenPointerEventsAtom)
  const [, setLevel1Display] = useAtom(level1DisplayAtom)
  const [, setLevel2Display] = useAtom(level2DisplayAtom)
  const [, setLevel3Display] = useAtom(level3DisplayAtom)
  const [, setMainMenuDisplay] = useAtom(mainMenuDisplayAtom)
  const [, setGameMenuDisplay] = useAtom(gameMenuDisplayAtom)
  const [, setLevelSelectDisplay] = useAtom(levelSelectDisplayAtom)
  const [, setBackBtnDisplay] = useAtom(backBtnDisplayAtom)
  const [, setWinScreenOpacity] = useAtom(winScreenOpacityAtom)
  const [, setWinScreenPointerEvents] = useAtom(winScreenPointerEventsAtom)
  const [, setFrostHP] = useAtom(frostHPatom)
  const [newFrostHP] = useAtom(newFrostHpAtom)
  const [enemy1HP, setEnemy1HP] = useAtom(enemy1HPatom)
  const [enemy2HP, setEnemy2HP] = useAtom(enemy2HPatom)
  const [enemy3HP, setEnemy3HP] = useAtom(enemy3HPatom)
  const [, setEnemy1HpDisplay] = useAtom(enemy1HpDisplayAtom)
  const [, setEnemy2HpDisplay] = useAtom(enemy2HpDisplayAtom)
  const [, setEnemy3HpDisplay] = useAtom(enemy3HpDisplayAtom)
  const [levelTurnsStatistic, setLevelTurnsStatistic] = useAtom(levelTurnsStatisticAtom)
  const [, setLevelDamageRecievedStatistic] = useAtom(levelDamageRecievedStatisticAtom)
  const [, setFrostcoins] = useAtom(frostcoinsAtom)
  const [rewardGiven, setRewardGiven] = useState(false)
  const [, setCurrentMusic] = useAtom(currentMusicAtom)

  const [, setLevel1SelectBtnBrightness] = useAtom(level1SelectBtnBrightnessAtom)
  const [, setLevel1SelectBtnPointerEvents] = useAtom(level1SelectBtnPointerEventsAtom)  
  const [, setLevel2SelectBtnBrightness] = useAtom(level2SelectBtnBrightnessAtom)
  const [, setLevel2SelectBtnPointerEvents] = useAtom(level2SelectBtnPointerEventsAtom)
  const [, setLevel3SelectBtnBrightness] = useAtom(level3SelectBtnBrightnessAtom)
  const [, setLevel3SelectBtnPointerEvents] = useAtom(level3SelectBtnPointerEventsAtom)  
  const [, setLevel4SelectBtnBrightness] = useAtom(level4SelectBtnBrightnessAtom)
  const [, setLevel4SelectBtnPointerEvents] = useAtom(level4SelectBtnPointerEventsAtom)

  // Reward Giving
  function handleRewardGive() {
    setRewardGiven(true)
    if (!rewardGiven) {
      if (levelTurnsStatistic >= 28) {
        setFrostcoins((prev) => prev + 50)
      } else if (levelTurnsStatistic >= 22 && levelTurnsStatistic <= 27) {
        setFrostcoins((prev) => prev + 80)
      } else {
        setFrostcoins((prev) => prev + 120)
      }
    }
    setTimeout(() => setRewardGiven(false),500)
  }

  return (
    <ContinueButtonItem
      onClick={() => {
        if (enemy1HP === 0) {
          setLevel1SelectBtnPointerEvents('none')
          setLevel1SelectBtnBrightness(50)
          setLevel2SelectBtnPointerEvents('all')
          setLevel2SelectBtnBrightness(100)
          setLevel3SelectBtnPointerEvents('none')
          setLevel3SelectBtnBrightness(50)
        }
        else if (enemy2HP === 0) {
          setLevel1SelectBtnPointerEvents('none')
          setLevel1SelectBtnBrightness(50)
          setLevel2SelectBtnPointerEvents('none')
          setLevel2SelectBtnBrightness(50)
          setLevel3SelectBtnPointerEvents('all')
          setLevel3SelectBtnBrightness(100)
        }
        else if (enemy3HP === 0) {
          setLevel1SelectBtnPointerEvents('none')
          setLevel1SelectBtnBrightness(50)
          setLevel2SelectBtnPointerEvents('none')
          setLevel2SelectBtnBrightness(50)
          setLevel3SelectBtnPointerEvents('none')
          setLevel3SelectBtnBrightness(50)
          setLevel4SelectBtnPointerEvents('all')
          setLevel4SelectBtnBrightness(100)
        }
        handleRewardGive()
        setTurn(data.yourTurn)
        setLoadingScreenOpacity(1)
        setLoadingScreenPointerEvents("all")
        setTimeout(() => {
          setLoadingScreenOpacity(0)
          setLoadingScreenPointerEvents("none")
        }, 6500)
        setTimeout(() => setCurrentMusic(menuThemeMusic), 3250)
        setTimeout(() => {
          setLevelState(0)
          setLevel1Display("none")
          setLevel2Display("none")
          setLevel3Display("none")
          setFrostHP(newFrostHP - 15)
          setEnemy1HP(1000000000)
          setEnemy2HP(1000000000)
          setEnemy3HP(1000000000)
          setEnemy1HpDisplay("none")
          setEnemy2HpDisplay("none")
          setEnemy3HpDisplay("none")
          setLevelTurnsStatistic(0)
          setLevelDamageRecievedStatistic(0)
          setGameMenuDisplay("none")
          setMainMenuDisplay("flex")
          setLevelSelectDisplay("flex")
          setBackBtnDisplay("flex")
          setTimeout(() => {
            setWinScreenPointerEvents("none")
            setWinScreenOpacity(0)
          }, 1000)
        }, 1500)
      }}
    >
      {data.continue}
    </ContinueButtonItem>
  )
}
