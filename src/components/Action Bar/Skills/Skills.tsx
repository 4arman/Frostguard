import styled from "styled-components"
import Skill from "./Skill"
import skill1Img from "../../../assets/images/skills/guardSkills/swordStrike.png"
import skill2Img from "../../../assets/images/skills/guardSkills/frostHeal.png"
import skill3Img from "../../../assets/images/skills/guardSkills/freezing.png"
import skill4Img from "../../../assets/images/skills/guardSkills/trueSwordPower.png"

import { useState } from "react"
import { atom, useAtom } from "jotai"
import { dataAtom } from "../../../data/data"
import { turnAtom, damageNumbersAtom, damageNumbersDisplayAtom, damageNumbersColorAtom, damageNumbersSymbolAtom, damageNumbersOpacityAtom } from "../../Level/Turn"
import { frostHPatom } from "../HP/FrostHP"
import { enemy1HPatom } from "../HP/Enemy1HP"
import { enemy2HPatom } from "../HP/Enemy2HP"
import { enemy3HPatom } from "../HP/Enemy3HP"
import { guardImgAtom } from "../../Guard/Guard"
import { enemy1ImgAtom } from "../../Enemys/Enemy1"
import { enemy2ImgAtom } from "../../Enemys/Enemy2"
import { enemy3ImgAtom } from "../../Enemys/Enemy3"

import GuardImg from "../../../assets/images/guard/guard.gif"
import guardSwordStrikeImg from "../../../assets/images/guard/guardSwordStrike.png"
import guardSwordStrike1Img from "../../../assets/images/guard/guardSwordStrike1.png"
import guardFrostHealImg from "../../../assets/images/guard/guardFrostHeal.png"
import guardFrostHeal1Img from "../../../assets/images/guard/guardFrostHeal1.png"
import guardFreezingImg from "../../../assets/images/guard/guardFreezing.png"
import guardFreezing1Img from "../../../assets/images/guard/guardFreezing1.png"
import guardTrueSwordPowerImg from "../../../assets/images/guard/guardTrueSwordPower.png"
import guardTrueSwordPower1Img from "../../../assets/images/guard/guardTrueSwordPower1.png"

import Enemy1Img from "../../../assets/images/enemys/enemy1/enemy1.gif"
import Enemy2Img from "../../../assets/images/enemys/enemy2/enemy2.gif"
import Enemy3Img from "../../../assets/images/enemys/enemy3/enemy3.gif"
import enemy1DamageReceivedImg from "../../../assets/images/enemys/enemy1/enemy1DamageReceived.gif"
import enemy2DamageReceivedImg from "../../../assets/images/enemys/enemy2/enemy2DamageReceived.gif"
import enemy3DamageReceivedImg from "../../../assets/images/enemys/enemy3/enemy3DamageReceived.gif"

import useSound from "use-sound"
import soundSkill1 from "../../../assets/sounds/skills/skill1.wav"
import soundSkill2 from "../../../assets/sounds/skills/skill2.wav"
import soundSkill3 from "../../../assets/sounds/skills/skill3.wav"
import soundSkill4 from "../../../assets/sounds/skills/skill4.wav"

import soundSwordStrike from "../../../assets/sounds/skills/swordStrike.wav"
import soundFrostHeal from "../../../assets/sounds/skills/frostHeal.wav"
import soundFreezing from "../../../assets/sounds/skills/freezing.wav"
import soundTrueSwordPower from "../../../assets/sounds/skills/trueSwordPower.wav"

const SkillsContainer = styled.div`
  width: 260px;
  height: 65px;
  background: linear-gradient(135deg, #2e5b7c, #00e1ff);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 225, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'MedievalSharp', cursive;
  color: #e0f7fa;
  text-transform: uppercase;
  transition: 300ms;
  overflow: hidden;
`

const SkillsBlock = styled.div`
  width: 260px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px solid #1c3a52;
`

const SkillInfoContainer = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: left;
  flex-direction: column;
  padding: 3px;
  background: #3347ae;
  background-size: 400% 400%;
  color: #f0f8ff;
  box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.4);
`


const SkillInfoTitle = styled.span`
  font-size: 25px;
  color: #ffffff;
`

type PointerEventsType = 'all' | 'none'
export const skillsContainerPointerEventsAtom = atom<PointerEventsType>('all')
export const skillsContainerBrightnessAtom = atom(100)

export const skillInfoTitleAtom = atom('SKILLS')
export const skillInfoDescriptionAtom = atom('')

let swordStrikeBasicDamage = Math.floor(Math.random() * (9 - 6 + 1)) + 6
export const swordStrikeBasicDamageAtom = atom(swordStrikeBasicDamage)
export const enemySkipTurnsAtom = atom(0)

export const swordStrikeValue1Atom = atom(6)
export const swordStrikeValue2Atom = atom(9)
export const frostHealValue1Atom = atom(4)
export const frostHealValue2Atom = atom(13)
export const freezingChanceAtom = atom(0.4)
export const trueSwordPowerValue1Atom = atom(1)
export const trueSwordPowerValue2Atom = atom(22)

export const swordStrikeLevelAtom = atom(1)
export const frostHealLevelAtom = atom(1)
export const freezingLevelAtom = atom(1)
export const trueSwordPowerLevelAtom = atom(1)

export default function Skills() {

  const [data] = useAtom(dataAtom)

  const [, setTurn] = useAtom(turnAtom)
  const [, setEnemySkipTurns] = useAtom(enemySkipTurnsAtom)
  const [, setFrostHP] = useAtom(frostHPatom)
  const [, setEnemy1HP] = useAtom(enemy1HPatom)
  const [, setEnemy2HP] = useAtom(enemy2HPatom)
  const [, setEnemy3HP] = useAtom(enemy3HPatom)

  const [, setDamageNumbers] = useAtom(damageNumbersAtom)
  const [, setDamageNumbersDisplay] = useAtom(damageNumbersDisplayAtom)
  const [, setDamageNumbersOpacity] = useAtom(damageNumbersOpacityAtom)
  const [, setDamageNumbersColor] = useAtom(damageNumbersColorAtom)
  const [, setDamageNumbersSymbol] = useAtom(damageNumbersSymbolAtom)

  const [skillsContainerPointerEvents] = useAtom(skillsContainerPointerEventsAtom)
  const [skillsContainerBrightness] = useAtom(skillsContainerBrightnessAtom)

  const [, setGuardImg] = useAtom(guardImgAtom)
  const [, setEnemy1Img] = useAtom(enemy1ImgAtom)
  const [, setEnemy2Img] = useAtom(enemy2ImgAtom)
  const [, setEnemy3Img] = useAtom(enemy3ImgAtom)

  const [skillInfoTitle, setSkillInfoTitle] = useAtom(skillInfoTitleAtom)
  const [skillInfoDescription, setSkillInfoDescription] = useAtom(skillInfoDescriptionAtom)

  const [swordStrikeDamage, setSwordStrikeDamage] = useAtom(swordStrikeBasicDamageAtom)
  const [isTrueSwordPowerActive, setIsTrueSwordPowerActive] = useState(false)

  const [playSoundSkill1] = useSound(soundSkill1)
  const [playSoundSkill2] = useSound(soundSkill2)
  const [playSoundSkill3] = useSound(soundSkill3)
  const [playSoundSkill4] = useSound(soundSkill4)

  const [playSoundSwordStrike] = useSound(soundSwordStrike)
  const [playSoundFrostHeal] = useSound(soundFrostHeal)
  const [playSoundFreezing] = useSound(soundFreezing)
  const [playSoundTrueSwordPower] = useSound(soundTrueSwordPower)

  const [swordStrikeValue1] = useAtom(swordStrikeValue1Atom)
  const [swordStrikeValue2] = useAtom(swordStrikeValue2Atom)
  const [frostHealValue1] = useAtom(frostHealValue1Atom)
  const [frostHealValue2] = useAtom(frostHealValue2Atom)
  const [freezingChance] = useAtom(freezingChanceAtom)
  const [trueSwordPowerValue1] = useAtom(trueSwordPowerValue1Atom)
  const [trueSwordPowerValue2] = useAtom(trueSwordPowerValue2Atom)

  const [swordStrikeLevel] = useAtom(swordStrikeLevelAtom)
  const [frostHealLevel] = useAtom(frostHealLevelAtom)
  const [freezingLevel] = useAtom(freezingLevelAtom)
  const [trueSwordPowerLevel] = useAtom(trueSwordPowerLevelAtom)

  const frostHealDamage = Math.floor(Math.random() * (frostHealValue2 - frostHealValue1 + 1)) + frostHealValue1

  const handleChangeTurn = () => setTimeout(() => setTurn(data.enemyTurn), 2000)

  const swordStrikeClick = () => {
    let damage
    if (isTrueSwordPowerActive) {
      damage = swordStrikeDamage
      setIsTrueSwordPowerActive(false)
    } else {
      damage = Math.floor(Math.random() * (swordStrikeValue2 - swordStrikeValue1 + 1)) + swordStrikeValue1
    }
    setGuardImg(guardSwordStrikeImg)
    setDamageNumbersColor('#00b3ff')
    setDamageNumbersSymbol('-')
    setTimeout(() => {
      playSoundSwordStrike()
      setGuardImg(guardSwordStrike1Img)
      setEnemy1Img(enemy1DamageReceivedImg)
      setEnemy2Img(enemy2DamageReceivedImg)
      setEnemy3Img(enemy3DamageReceivedImg)
      setTimeout(() => setEnemy1Img(Enemy1Img), 500)
      setTimeout(() => setEnemy2Img(Enemy2Img), 250)
      setTimeout(() => setEnemy3Img(Enemy3Img), 500)
      setDamageNumbersOpacity(1)
      setDamageNumbersDisplay('flex')
      setDamageNumbers(damage)
      setEnemy1HP(pv => pv - damage)
      setEnemy2HP(pv => pv - damage)
      setEnemy3HP(pv => pv - damage)
    }, 1000)
  
    setTimeout(() => {
      setGuardImg(GuardImg)
      setDamageNumbersDisplay('none')
    }, 2000)
  
    handleChangeTurn()
  }
  const frostHealClick = () => {
    setGuardImg(guardFrostHealImg)
    setDamageNumbersColor('#00e91f')
    setDamageNumbersSymbol('+')
    setTimeout(() => {
      playSoundFrostHeal()
      setGuardImg(guardFrostHeal1Img)
      setDamageNumbersOpacity(1)
      setDamageNumbersDisplay('flex')
      setDamageNumbers(frostHealDamage)
      setFrostHP(pv => pv + frostHealDamage)
    }, 1000)
    setTimeout(() => {
      setGuardImg(GuardImg)
      setDamageNumbersDisplay('none')
    }, 2000)
    handleChangeTurn()
  }
  const freezingClick = () => {
    const shouldSkipTurns = Math.random() < freezingChance
    setGuardImg(guardFreezingImg)
    setDamageNumbersSymbol('')
    setDamageNumbersColor('red')
    setDamageNumbers(data.fail)
    setTimeout(() => {
      if (shouldSkipTurns) {
        setTurn(data.yourTurn)
        setEnemySkipTurns(2)
        setDamageNumbersColor('#00b3ff')
        setDamageNumbers(data.succes)
      }
    }, 500)
    setTimeout(() => {
      playSoundFreezing()
      setGuardImg(guardFreezing1Img)
      setDamageNumbersOpacity(1)
      setDamageNumbersDisplay('flex')
      
    }, 1000)
    setTimeout(() => {
      setDamageNumbersOpacity(1)
      setDamageNumbersDisplay('none')
      setGuardImg(GuardImg)
    }, 2000)
    handleChangeTurn()
  }
  const trueSwordPowerClick = () => {
    setGuardImg(guardTrueSwordPowerImg)
    setTimeout(() => {
      playSoundTrueSwordPower()
      setGuardImg(guardTrueSwordPower1Img)
    }, 1000)

    let damage = Math.random() < 0.5 ? trueSwordPowerValue1 : trueSwordPowerValue2
    setSwordStrikeDamage(damage)
    setIsTrueSwordPowerActive(true)
  
    setTimeout(() => setGuardImg(GuardImg), 2000)
  
    handleChangeTurn()
  }

  return (
    <SkillsBlock>

    <SkillsContainer style={{
      pointerEvents: skillsContainerPointerEvents,
      filter: `brightness(${skillsContainerBrightness}%)`
    }}>
      <Skill 
      img={skill1Img}
      onClick={() => {
        playSoundSkill1()
        swordStrikeClick()
      }}
      onHover={() => {
        setSkillInfoTitle(`${data.swordStrikeTitle} lvl(${swordStrikeLevel})`)
        setSkillInfoDescription(`${data.swordStrikeInfo1} ${swordStrikeValue1}-${swordStrikeValue2} ${data.swordStrikeInfo2}`)
      }}
      />
      <Skill 
      img={skill2Img}
      onClick={() => {
        playSoundSkill2()
        frostHealClick()
      }}
      onHover={() => {
        setSkillInfoTitle(`${data.frostHealTitle} lvl(${frostHealLevel})`)
        setSkillInfoDescription(`${data.frostHealInfo1} ${frostHealValue1}-${frostHealValue2} ${data.frostHealInfo2}`)
      }}
      />
      <Skill 
      img={skill3Img}
      onClick={() => {
        playSoundSkill3()
        freezingClick()
      }}
      onHover={() => {
        setSkillInfoTitle(`${data.freezingTitle} lvl(${freezingLevel})`)
        setSkillInfoDescription(`${data.freezingInfo1} (${Math.floor(freezingChance * 100)}% ${data.freezingInfo2})`)
      }}
      />
      <Skill 
      img={skill4Img}
      onClick={() => {
        playSoundSkill4()
        trueSwordPowerClick()
      }}
      onHover={() => {
        setSkillInfoTitle(`${data.trueSwordPowerTitle} lvl(${trueSwordPowerLevel})`)
        setSkillInfoDescription(`${data.trueSwordPowerInfo1} ${trueSwordPowerValue1} ${data.trueSwordPowerInfo2} ${trueSwordPowerValue2} ${data.trueSwordPowerInfo3}`)
      }}
      />
    </SkillsContainer>

    <SkillInfoContainer>
      <SkillInfoTitle>{skillInfoTitle}</SkillInfoTitle>
      <span style={{color: `#d8d3ff`}}>{skillInfoDescription}</span>
    </SkillInfoContainer>

    </SkillsBlock>
  )
}
