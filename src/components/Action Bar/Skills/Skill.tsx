import React from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { enemySkipTurnsAtom, skillInfoDescriptionAtom, skillInfoTitleAtom, skillsContainerBrightnessAtom, skillsContainerPointerEventsAtom } from './Skills'
import { levelTurnsStatisticAtom } from '../../Level/Turn'
import { gameMenuButtonAtom } from '../ActionBar'
import useSound from 'use-sound'
import skillHoverSound from "../../../assets/sounds/skills/skillHover.wav"

const SkillItem = styled.div`
  width: 65px;
  height: 65px;
  background-color: green;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  };
  &:active {
    opacity: 0.5;
  }
`

interface SkillProps {
  img: any,
  onClick: any,
  onHover: any
}

const Skill: React.FC<SkillProps> = ({
  img, onClick, onHover
}) => {

  const [, setSkillContainerPointerEvents] = useAtom(skillsContainerPointerEventsAtom)
  const [, setSkillsContainerBrightness] = useAtom(skillsContainerBrightnessAtom)
  const [, setLevelTurnsStatisticAtom] = useAtom(levelTurnsStatisticAtom)
  const [, setSkillInfoTitle] = useAtom(skillInfoTitleAtom)
  const [, setSkillInfoDescription] = useAtom(skillInfoDescriptionAtom)
  const [, setGameMenuButtonPointerEvents] = useAtom(gameMenuButtonAtom)

  const [, setEnemySkipTurns] = useAtom(enemySkipTurnsAtom)

  const [playSkillHoverSound] = useSound(skillHoverSound)

  const handleSkillClick = () => {
    onClick()
    setSkillContainerPointerEvents('none')
    setGameMenuButtonPointerEvents('none')
    setLevelTurnsStatisticAtom(pv => pv + 1)
    setSkillsContainerBrightness(30)
    setEnemySkipTurns(pv => pv - 1)
    setTimeout(() => {
      setSkillContainerPointerEvents('all')
      setGameMenuButtonPointerEvents('all')
      setSkillsContainerBrightness(100)
    }, 6000)
  }

  return (
    <SkillItem
    style={{
      backgroundImage: `url(${img})`,
    }}
    onClick={handleSkillClick}
    onMouseEnter={() => {
      onHover()
      playSkillHoverSound()
    }}
    onMouseLeave={() => {
      setSkillInfoTitle('SKILLS')
      setSkillInfoDescription('')
    }}
    >     
    </SkillItem>
  )
}

export default Skill
