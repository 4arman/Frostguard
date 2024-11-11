import styled from "styled-components"
import level2Img from "../../../assets/images/levels/level2.gif"
import ActionBar from "../../Action Bar/ActionBar"
import Platform from "../../Platform"
import { useEffect, useState } from "react"
import { atom, useAtom } from "jotai"
import { dataAtom } from "../../../data/data"
import { levelStateAtom } from "../LevelState"
import Guard, { guardImgAtom } from "../../Guard/Guard"
import Enemy2, { enemy2ImgAtom } from "../../Enemys/Enemy2"
import Turn, { damageNumbersAtom, damageNumbersDisplayAtom, damageNumbersSymbolAtom, turnAtom } from "../Turn"
import { enemy2HPatom } from "../../Action Bar/HP/Enemy2HP"
import { frostHPatom } from "../../Action Bar/HP/FrostHP"
import { levelDamageRecievedStatisticAtom } from "../Turn"
import { enemySkipTurnsAtom } from "../../Action Bar/Skills/Skills"

import GuardImg from "../../../assets/images/guard/guard.gif"
import guardsDamageReceiveImg from "../../../assets/images/guard/guardDamageRecieve.gif"

import Enemy2Img from "../../../assets/images/enemys/enemy2/enemy2.gif"
import enemy2AttackImg from "../../../assets/images/enemys/enemy2/enemy2Attack.png"
import enemy2Attack1Img from "../../../assets/images/enemys/enemy2/enemy2Attack1.png"
import enemy2HealImg from "../../../assets/images/enemys/enemy2/enemy2Heal.png"

import { level1SelectBtnBrightnessAtom, level1SelectBtnPointerEventsAtom, level2SelectBtnBrightnessAtom, level2SelectBtnPointerEventsAtom, level3SelectBtnBrightnessAtom, level3SelectBtnPointerEventsAtom } from "../LevelSelect/LevelSelect"

import useSound from "use-sound"
import soundEnemy2Attack from "../../../assets/sounds/enemy/enemy2attack.mp3"
import soundEnemyDamage from "../../../assets/sounds/enemy/enemyDamage.wav"
import soundEnemyHeal from "../../../assets/sounds/enemy/enemyHeal.wav"

const Level2Container = styled.section`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${level2Img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const enemyAttackValue = () => Math.floor(Math.random() * (17 - 4 + 1)) + 4
const enemyHealValue = () => Math.floor(Math.random() * (12 - 4 + 1)) + 4
export const enemyAttackAtom = atom(0)
export const level2DisplayAtom = atom('none')

export default function Level2() {

  const [level2Display] = useAtom(level2DisplayAtom)

  const [data] = useAtom(dataAtom)

  const [levelState] = useAtom(levelStateAtom)
  const [turn, setTurn] = useAtom(turnAtom)
  const [enemySkipTurns] = useAtom(enemySkipTurnsAtom)
  const [enemy2HP, setEnemy2HP] = useAtom(enemy2HPatom)
  const [frostHP, setFrostHP] = useAtom(frostHPatom)

  const [, setDamageNumbers] = useAtom(damageNumbersAtom)
  const [, setDamageNumbersDisplay] = useAtom(damageNumbersDisplayAtom)
  const [, setDamageNumbersSymbol] = useAtom(damageNumbersSymbolAtom)

  const [enemyAttack, setEnemyAttack] = useAtom(enemyAttackAtom)
  const [, setLevelDamageRecievedStatistic] = useAtom(levelDamageRecievedStatisticAtom)

  const [, setGuardImg] = useAtom(guardImgAtom)
  const [, setEnemy2Img] = useAtom(enemy2ImgAtom)

  const [, setLevel1SelectBtnPointerEvents] = useAtom(level1SelectBtnPointerEventsAtom)
  const [, setLevel1SelectBtnBrightness] = useAtom(level1SelectBtnBrightnessAtom)  
  const [, setLevel2SelectBtnPointerEvents] = useAtom(level2SelectBtnPointerEventsAtom)
  const [, setLevel2SelectBtnBrightness] = useAtom(level2SelectBtnBrightnessAtom)
  const [, setLevel3SelectBtnPointerEvents] = useAtom(level3SelectBtnPointerEventsAtom)
  const [, setLevel3SelectBtnBrightness] = useAtom(level3SelectBtnBrightnessAtom)

  const [levelClose, setLevelClose] = useState(0)

  const [playSoundEnemy2Attack] = useSound(soundEnemy2Attack)
  const [playSoundEnemyDamage] = useSound(soundEnemyDamage)
  const [playSoundEnemyHeal] = useSound(soundEnemyHeal)

  // Enemy Single Attack
  function handleEnemyAction1() {
  const newAttackValue = enemyAttackValue()
  setDamageNumbersSymbol('-')
  setEnemy2Img(enemy2AttackImg)
    setTimeout(() => {
      playSoundEnemyDamage()
      setEnemy2Img(enemy2Attack1Img)
      setGuardImg(guardsDamageReceiveImg)
      setTimeout(() => setGuardImg(GuardImg), 250)
      setDamageNumbersDisplay('flex')
      setDamageNumbers(newAttackValue)
      setFrostHP((prevValue) => prevValue - newAttackValue)
    }, 2000)
  
    setTimeout(() => {
      setDamageNumbersDisplay('none')
      setTurn(data.yourTurn)
      setEnemy2Img(Enemy2Img)
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
    setEnemy2Img(enemy2AttackImg)
    setTimeout(() => {
      playSoundEnemyHeal()
      setEnemy2HP(prevValue => prevValue + healValue)
      setEnemy2Img(enemy2HealImg)
      setTimeout(() => setGuardImg(GuardImg), 250)
      setDamageNumbersDisplay('flex')
      setDamageNumbers(healValue)
      setTurn(data.yourTurn)
    }, 2000)
    setTimeout(() => {
      setDamageNumbersDisplay('none') 
      setEnemy2Img(Enemy2Img)
    }, 3500)
  }

  // Enemy Actions
  useEffect(() => {  
    if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 2 && enemy2HP >= 50 && frostHP > 12) {
      playSoundEnemy2Attack()
      handleEnemyAction1()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 2 && enemy2HP < 50 && frostHP > 12) {
      playSoundEnemy2Attack()
      Math.random() < 0.65 ? handleEnemyAction1() : handleEnemyAction2()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 2 && enemy2HP > 10 && frostHP <= 12 && frostHP > 4) {
      playSoundEnemy2Attack()
      handleEnemyAction1()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 2 && enemy2HP > 0 && frostHP <= 4) {
      playSoundEnemy2Attack()
      handleEnemyAction1()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 2 && enemy2HP <= 10 && frostHP > 4) {
      playSoundEnemy2Attack()
      handleEnemyAction2()
    }
    else if (enemySkipTurns > 0 && levelState === 2) {
      setTurn(data.yourTurn)
    }
  }, [turn, enemySkipTurns, enemyAttack, enemy2HP, setTurn, setFrostHP])

  // Enemy Lose
  useEffect(() => {
    if (enemy2HP <= 0) {
      setLevelClose(1)
    }
  }, [enemy2HP, levelClose])
  
  if (levelClose === 1) {
    setLevel1SelectBtnPointerEvents('none')
    setLevel1SelectBtnBrightness(50)      
    setLevel2SelectBtnPointerEvents('none')
    setLevel2SelectBtnBrightness(50)
    setLevel3SelectBtnPointerEvents('all')
    setLevel3SelectBtnBrightness(100)
  }

  return (
    <Level2Container 
    style={{
      display: level2Display
    }}
    >
      <Turn />
      <Guard />
      <Enemy2 />
      <Platform />
      <ActionBar />
    </Level2Container>
  )
}
