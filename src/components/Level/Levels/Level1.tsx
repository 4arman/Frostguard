import styled from "styled-components"
import level1Img from "../../../assets/images/levels/level1.gif"
import ActionBar from "../../Action Bar/ActionBar"
import Platform from "../../Platform"
import { useEffect, useState } from "react"
import { atom, useAtom } from "jotai"
import { dataAtom } from "../../../data/data"
import { levelStateAtom } from "../LevelState"
import Guard, { guardImgAtom } from "../../Guard/Guard"
import Enemy1, { enemy1ImgAtom } from "../../Enemys/Enemy1"
import Turn, { damageNumbersAtom, damageNumbersDisplayAtom, damageNumbersSymbolAtom, turnAtom } from "../Turn"
import { enemy1HPatom } from "../../Action Bar/HP/Enemy1HP"
import { frostHPatom } from "../../Action Bar/HP/FrostHP"
import { levelDamageRecievedStatisticAtom } from "../Turn"
import { enemySkipTurnsAtom } from "../../Action Bar/Skills/Skills"

import GuardImg from "../../../assets/images/guard/guard.gif"
import guardsDamageReceiveImg from "../../../assets/images/guard/guardDamageRecieve.gif"

import Enemy1Img from "../../../assets/images/enemys/enemy1/enemy1.gif"
import enemy1AttackImg from "../../../assets/images/enemys/enemy1/enemy1Attack.png"
import enemy1Attack1Img from "../../../assets/images/enemys/enemy1/enemy1Attack1.png"
import enemy1HealImg from "../../../assets/images/enemys/enemy1/enemy1Heal.png"

import { level1SelectBtnBrightnessAtom, level1SelectBtnPointerEventsAtom, level2SelectBtnBrightnessAtom, level2SelectBtnPointerEventsAtom, level3SelectBtnBrightnessAtom, level3SelectBtnPointerEventsAtom } from "../LevelSelect/LevelSelect"

import useSound from "use-sound"
import soundEnemy1Attack from "../../../assets/sounds/enemy/enemy1attack.wav"
import soundEnemyDamage from "../../../assets/sounds/enemy/enemyDamage.wav"
import soundEnemyHeal from "../../../assets/sounds/enemy/enemyHeal.wav"

const Level1Container = styled.section`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${level1Img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const enemyAttackValue = () => Math.floor(Math.random() * (14 - 5 + 1)) + 5
const enemyHealValue = () => Math.floor(Math.random() * (12 - 2 + 1)) + 2
export const enemyAttackAtom = atom(0)
export const level1DisplayAtom = atom('none')

export default function Level1() {

  const [level1Display] = useAtom(level1DisplayAtom)

  const [data] = useAtom(dataAtom)

  const [levelState] = useAtom(levelStateAtom)
  const [turn, setTurn] = useAtom(turnAtom)
  const [enemySkipTurns] = useAtom(enemySkipTurnsAtom)
  const [enemy1HP, setEnemy1HP] = useAtom(enemy1HPatom)
  const [frostHP, setFrostHP] = useAtom(frostHPatom)

  const [, setDamageNumbers] = useAtom(damageNumbersAtom)
  const [, setDamageNumbersDisplay] = useAtom(damageNumbersDisplayAtom)
  const [, setDamageNumbersSymbol] = useAtom(damageNumbersSymbolAtom)

  const [enemyAttack, setEnemyAttack] = useAtom(enemyAttackAtom)
  const [, setLevelDamageRecievedStatistic] = useAtom(levelDamageRecievedStatisticAtom)

  const [, setGuardImg] = useAtom(guardImgAtom)
  const [, setEnemy1Img] = useAtom(enemy1ImgAtom)

  const [, setLevel1SelectBtnPointerEvents] = useAtom(level1SelectBtnPointerEventsAtom)
  const [, setLevel1SelectBtnBrightness] = useAtom(level1SelectBtnBrightnessAtom)
  const [, setLevel2SelectBtnPointerEvents] = useAtom(level2SelectBtnPointerEventsAtom)
  const [, setLevel2SelectBtnBrightness] = useAtom(level2SelectBtnBrightnessAtom)  
  const [, setLevel3SelectBtnPointerEvents] = useAtom(level3SelectBtnPointerEventsAtom)
  const [, setLevel3SelectBtnBrightness] = useAtom(level3SelectBtnBrightnessAtom)

  const [levelClose, setLevelClose] = useState(0)

  const [playSoundEnemy1Attack] = useSound(soundEnemy1Attack)
  const [playSoundEnemyDamage] = useSound(soundEnemyDamage)
  const [playSoundEnemyHeal] = useSound(soundEnemyHeal)

  // Enemy Single Attack
  function handleEnemyAction1() {
  const newAttackValue = enemyAttackValue()
  setDamageNumbersSymbol('-')
  setEnemy1Img(enemy1AttackImg)
  setTimeout(() => setTurn(data.yourTurn), 1950)
  setTimeout(() => {
    playSoundEnemyDamage()
    setEnemy1Img(enemy1Attack1Img)
    setGuardImg(guardsDamageReceiveImg)
    setTimeout(() => setGuardImg(GuardImg), 250)
    setDamageNumbersDisplay('flex')
    setDamageNumbers(newAttackValue)
    setFrostHP((prevValue) => prevValue - newAttackValue)
  }, 2000)
  
    setTimeout(() => {
      setDamageNumbersDisplay('none')
      setEnemy1Img(Enemy1Img)
    }, 3500)
    setTimeout(() => {
      setEnemyAttack(newAttackValue)
      setLevelDamageRecievedStatistic((prevValue) => prevValue + newAttackValue)
    }, 6000)
  }

  // Enemy Single Heal
  function handleEnemyAction2() {
    const healValue = enemyHealValue()
    setDamageNumbersSymbol('+')
    setEnemy1Img(enemy1AttackImg)
    setTimeout(() => {
      playSoundEnemyHeal()
      setEnemy1HP(prevValue => prevValue + healValue)
      setEnemy1Img(enemy1HealImg)
      setTimeout(() => setGuardImg(GuardImg), 250)
      setDamageNumbersDisplay('flex')
      setDamageNumbers(healValue)
      setTurn(data.yourTurn)
    }, 2000)
    setTimeout(() => {
      setDamageNumbersDisplay('none') 
      setEnemy1Img(Enemy1Img)
    }, 3500)
  }

  // Enemy Actions
  useEffect(() => {  
    if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 1 && enemy1HP >= 40 && frostHP > 10) {
      playSoundEnemy1Attack()
      handleEnemyAction1()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 1 && enemy1HP < 40 && enemy1HP > 0 && frostHP > 10) {
      playSoundEnemy1Attack()
      Math.random() < 0.6 ? handleEnemyAction1() : handleEnemyAction2()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 1 && enemy1HP > 9 && frostHP <= 10 && frostHP > 5) {
      playSoundEnemy1Attack()
      handleEnemyAction1()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 1 && enemy1HP <= 9 && enemy1HP > 0 && frostHP <= 10 && frostHP > 5) {
      playSoundEnemy1Attack()
      handleEnemyAction1()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 1 && enemy1HP > 0 && frostHP <= 5) {
      playSoundEnemy1Attack()
      handleEnemyAction1()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 1 && enemy1HP <= 7 && enemy1HP > 0 && frostHP > 5) {
      playSoundEnemy1Attack()
      handleEnemyAction2()
    }
    else if (enemySkipTurns > 0 && levelState === 1) {
      setTurn(data.yourTurn)
    }
  }, [turn, enemySkipTurns, enemyAttack, enemy1HP, setTurn, setFrostHP])
  
  // Enemy Lose
  useEffect(() => {
    if (enemy1HP <= 0) {
      setLevelClose(1)
    }
  }, [enemy1HP, levelClose])

  if (levelClose === 1) {
    setLevel1SelectBtnPointerEvents('none')
    setLevel1SelectBtnBrightness(50)
    setLevel3SelectBtnPointerEvents('none')
    setLevel3SelectBtnBrightness(50)
    setLevel2SelectBtnPointerEvents('all')
    setLevel2SelectBtnBrightness(100)
  }

  return (
    <Level1Container 
    style={{
      display: level1Display
    }}
    >
      <Turn />
      <Guard />
      <Enemy1 />
      <Platform />
      <ActionBar />
    </Level1Container>
  )
}
