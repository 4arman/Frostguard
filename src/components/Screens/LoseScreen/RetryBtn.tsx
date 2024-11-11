import styled from "styled-components"
import { useAtom } from "jotai"
import { dataAtom } from "../../../data/data"
import { levelDamageRecievedStatisticAtom, levelTurnsStatisticAtom } from "../../Level/Turn"
import { enemy1HPatom } from "../../Action Bar/HP/Enemy1HP"
import { enemy2HPatom } from "../../Action Bar/HP/Enemy2HP"
import { enemy3HPatom } from "../../Action Bar/HP/Enemy3HP"
import { frostHPatom } from "../../Action Bar/HP/FrostHP"
import { newFrostHpAtom } from "../../Menu/Upgrades/Upgrades"
import { loadingScreenOpacityAtom, loadingScreenPointerEventsAtom } from "../LoadingScreen"
import { loseScreenOpacityAtom, loseScreenPointerEventsAtom } from "./LoseScreen"
import { swordStrikeBasicDamageAtom } from "../../Action Bar/Skills/Skills"
import { guardImgAtom } from "../../Guard/Guard"
import GuardImg from "../../../assets/images/guard/guard.gif"

const RetryButtonItem = styled.button`
  width: 20%;
  height: 100px;
  font-size: 20px;
  background: linear-gradient(90deg, #9a2b2b, #e85a5a);
  color: #e0f7fa;
  border-radius: 8px;
  border: 2px solid #9a2b2b;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background: linear-gradient(90deg, #e85a5a, #9a2b2b);
    color: #aee1f6;
  }
  &:active {
    background: linear-gradient(90deg, #b33e3e, #f07373);
    color: #aee1f6;
  }
`

export default function RetryButton () {

  const [data] = useAtom(dataAtom)
  const [, setLoadingScreenOpacity] = useAtom(loadingScreenOpacityAtom)
  const [, setLoadingScreenPointerEvents] = useAtom(loadingScreenPointerEventsAtom)
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
  const [, setGuardImg] = useAtom(guardImgAtom)


  return (
    <RetryButtonItem
    onClick={() => {
      setTimeout(() => {
        setEnemy1HP(100)
        setEnemy2HP(120)
        setEnemy3HP(150)
        setFrostHP(newFrostHP - 15)
      }, 500)
      setTimeout(() => {
        setLoseScreenOpacity(0)
        setLoseScreenPointerEvents('none')
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
    >
      {data.retry}
    </RetryButtonItem>
  )
}
