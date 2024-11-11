import styled from "styled-components"
import level3Img from "../../../assets/images/levels/level3.gif"
import ActionBar from "../../Action Bar/ActionBar"
import Platform from "../../Platform"
import { useEffect, useState } from "react"
import { atom, useAtom } from "jotai"
import { dataAtom } from "../../../data/data"
import { levelStateAtom } from "../LevelState"
import Guard, { guardImgAtom } from "../../Guard/Guard"
import Enemy3, { enemy3ImgAtom } from "../../Enemys/Enemy3"
import Turn, { damageNumbersAtom, damageNumbersDisplayAtom, damageNumbersSymbolAtom, turnAtom } from "../Turn"
import { enemy3HPatom } from "../../Action Bar/HP/Enemy3HP"
import { frostHPatom } from "../../Action Bar/HP/FrostHP"
import { levelDamageRecievedStatisticAtom } from "../Turn"
import { enemySkipTurnsAtom } from "../../Action Bar/Skills/Skills"

import GuardImg from "../../../assets/images/guard/guard.gif"
import guardsDamageReceiveImg from "../../../assets/images/guard/guardDamageRecieve.gif"

import Enemy3Img from "../../../assets/images/enemys/enemy3/enemy3.gif"
import enemy3AttackImg from "../../../assets/images/enemys/enemy3/enemy3Attack.png"
import enemy3Attack1Img from "../../../assets/images/enemys/enemy3/enemy3Attack1.png"
import enemy3HealImg from "../../../assets/images/enemys/enemy3/enemy3Heal.png"

import { level1SelectBtnBrightnessAtom, level1SelectBtnPointerEventsAtom, level2SelectBtnBrightnessAtom, level2SelectBtnPointerEventsAtom, level3SelectBtnBrightnessAtom, level3SelectBtnPointerEventsAtom, level4SelectBtnBrightnessAtom, level4SelectBtnPointerEventsAtom } from "../LevelSelect/LevelSelect"

import useSound from "use-sound"
import soundEnemy3Attack from "../../../assets/sounds/enemy/enemy3attack.mp3"
import soundEnemyDamage from "../../../assets/sounds/enemy/enemyDamage.wav"
import soundEnemyHeal from "../../../assets/sounds/enemy/enemyHeal.wav"

const Level3Container = styled.section`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(${level3Img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

const enemyAttackValue = () => Math.floor(Math.random() * (20 - 7 + 1)) + 7
const enemyHealValue = () => Math.floor(Math.random() * (13 - 7 + 1)) + 7
export const enemyAttackAtom = atom(0)
export const level3DisplayAtom = atom('none')

export default function Level3() {

  const [level3Display] = useAtom(level3DisplayAtom)

  const [data] = useAtom(dataAtom)

  const [levelState] = useAtom(levelStateAtom)
  const [turn, setTurn] = useAtom(turnAtom)
  const [enemySkipTurns] = useAtom(enemySkipTurnsAtom)
  const [enemy3HP, setEnemy3HP] = useAtom(enemy3HPatom)
  const [frostHP, setFrostHP] = useAtom(frostHPatom)

  const [, setDamageNumbers] = useAtom(damageNumbersAtom)
  const [, setDamageNumbersDisplay] = useAtom(damageNumbersDisplayAtom)
  const [, setDamageNumbersSymbol] = useAtom(damageNumbersSymbolAtom)

  const [enemyAttack, setEnemyAttack] = useAtom(enemyAttackAtom)
  const [, setLevelDamageRecievedStatistic] = useAtom(levelDamageRecievedStatisticAtom)

  const [, setGuardImg] = useAtom(guardImgAtom)
  const [, setEnemy3Img] = useAtom(enemy3ImgAtom)

  const [, setLevel1SelectBtnPointerEvents] = useAtom(level1SelectBtnPointerEventsAtom)
  const [, setLevel1SelectBtnBrightness] = useAtom(level1SelectBtnBrightnessAtom)  
  const [, setLevel2SelectBtnPointerEvents] = useAtom(level2SelectBtnPointerEventsAtom)
  const [, setLevel2SelectBtnBrightness] = useAtom(level2SelectBtnBrightnessAtom)
  const [, setLevel3SelectBtnPointerEvents] = useAtom(level3SelectBtnPointerEventsAtom)
  const [, setLevel3SelectBtnBrightness] = useAtom(level3SelectBtnBrightnessAtom)
  const [, setLevel4SelectBtnPointerEvents] = useAtom(level4SelectBtnPointerEventsAtom)
  const [, setLevel4SelectBtnBrightness] = useAtom(level4SelectBtnBrightnessAtom)

  const [levelClose, setLevelClose] = useState(0)

  const [playSoundEnemy3Attack] = useSound(soundEnemy3Attack)
  const [playSoundEnemyDamage] = useSound(soundEnemyDamage)
  const [playSoundEnemyHeal] = useSound(soundEnemyHeal)

  // Enemy Single Attack
  function handleEnemyAction1() {
  const newAttackValue = enemyAttackValue()
  setDamageNumbersSymbol('-')
  setEnemy3Img(enemy3AttackImg)
    setTimeout(() => {
      playSoundEnemyDamage()
      setEnemy3Img(enemy3Attack1Img)
      setGuardImg(guardsDamageReceiveImg)
      setTimeout(() => setGuardImg(GuardImg), 250)
      setDamageNumbersDisplay('flex')
      setDamageNumbers(newAttackValue)
      setFrostHP((prevValue) => prevValue - newAttackValue)
    }, 2000)
  
    setTimeout(() => {
      setDamageNumbersDisplay('none')
      setTurn(data.yourTurn)
      setEnemy3Img(Enemy3Img)
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
    setEnemy3Img(enemy3AttackImg)
    setTimeout(() => {
      playSoundEnemyHeal()
      setEnemy3HP(prevValue => prevValue + healValue)
      setEnemy3Img(enemy3HealImg)
      setTimeout(() => setGuardImg(GuardImg), 250)
      setDamageNumbersDisplay('flex')
      setDamageNumbers(healValue)
      setTurn(data.yourTurn)
    }, 2000)
    setTimeout(() => {
      setDamageNumbersDisplay('none') 
      setEnemy3Img(Enemy3Img)
    }, 3500)
  }

  // Enemy Actions
  useEffect(() => {  
    if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 3 && enemy3HP >= 50 && frostHP > 13) {
      playSoundEnemy3Attack()
      handleEnemyAction1()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 3 && enemy3HP < 50 && frostHP > 13) {
      playSoundEnemy3Attack()
      Math.random() < 0.65 ? handleEnemyAction1() : handleEnemyAction2()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 3 && enemy3HP > 10 && frostHP <= 13 && frostHP > 4) {
      playSoundEnemy3Attack()
      handleEnemyAction1()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 3 && enemy3HP > 0 && frostHP <= 4) {
      playSoundEnemy3Attack()
      handleEnemyAction1()
    } else if (turn === data.enemyTurn && enemySkipTurns <= 0 && levelState === 3 && enemy3HP <= 10 && frostHP > 4) {
      playSoundEnemy3Attack()
      handleEnemyAction2()
    }
    else if (enemySkipTurns > 0 && levelState === 3) {
      setTurn(data.yourTurn)
    }
  }, [turn, enemySkipTurns, enemyAttack, enemy3HP, setTurn, setFrostHP])

  // Enemy Lose
  useEffect(() => {
    if (enemy3HP <= 0) {
      setLevelClose(1)
    }
  }, [enemy3HP, levelClose])

  if (levelClose === 1) {
    setLevel1SelectBtnPointerEvents('none')
    setLevel1SelectBtnBrightness(50)
    setLevel2SelectBtnPointerEvents('none')
    setLevel2SelectBtnBrightness(50)      
    setLevel3SelectBtnPointerEvents('none')
    setLevel3SelectBtnBrightness(50)
    setLevel4SelectBtnPointerEvents('all')
    setLevel4SelectBtnBrightness(100)
  }

  return (
    <Level3Container 
    style={{
      display: level3Display
    }}
    >
      <Turn />
      <Guard />
      <Enemy3 />
      <Platform />
      <ActionBar />
    </Level3Container>
  )
}
