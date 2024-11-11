import styled from 'styled-components'
import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { dataAtom } from '../../../data/data'
import { levelStateAtom } from '../../Level/LevelState'
import { levelCoinsStatisticAtom, levelDamageRecievedStatisticAtom, levelTurnsStatisticAtom, turnAtom } from '../../Level/Turn'
import { enemy1HPatom } from '../../Action Bar/HP/Enemy1HP'
import { enemy2HPatom } from '../../Action Bar/HP/Enemy2HP'
import { enemy3HPatom } from '../../Action Bar/HP/Enemy3HP'
import ContinueButton from './ContinueBtn'

import useSound from 'use-sound'
import statSound from '../../../assets/sounds/screens/win/stat.ogg'
import continueBtnSound from '../../../assets/sounds/screens/win/continueBtn.ogg'

const WinScreenContainer = styled.section`
  width: 100%;
  height: 100%;
  transition: 500ms;
  background: #131f3dca;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
  position: absolute;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  div {
    font-size: 60px;
    color: #ffffff;
  }
`

const ContinueBtnBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

type PointerEventsType = 'none' | 'all'
export const winScreenPointerEventsAtom = atom<PointerEventsType>('none')
export const winScreenOpacityAtom = atom(0)

export default function WinScreen () {

  const [data] = useAtom(dataAtom)
  const [levelState] = useAtom(levelStateAtom)
  const [winScreenOpacity, setWinScreenOpacity] = useAtom(winScreenOpacityAtom)
  const [winScreenPointerEvents, setWinScreenPointerEvents] = useAtom(winScreenPointerEventsAtom)
  const [levelTurnsStatistic] = useAtom(levelTurnsStatisticAtom)
  const [levelDamageRecievedStatistic] = useAtom(levelDamageRecievedStatisticAtom)
  const [levelCoinsStatistic, setLevelCoinsStatistic] = useAtom(levelCoinsStatisticAtom)
  const [, setTurn] = useAtom(turnAtom)
  const [enemy1HP] = useAtom(enemy1HPatom)
  const [enemy2HP] = useAtom(enemy2HPatom)
  const [enemy3HP] = useAtom(enemy3HPatom)

  const [block1, setBlock1] = useState('none')
  const [block2, setBlock2] = useState('none')
  const [block3, setBlock3] = useState('none')
  const [block4, setBlock4] = useState('none')
  const [block5, setBlock5] = useState('none')

  const [playStatSound] = useSound(statSound)
  const [playContinueBtnSound] = useSound(continueBtnSound)

  const handleEnemyHpZero = (hp: any, state: number) => {
    useEffect(() => {
      if (hp <= 0 && levelState === state) {
        setWinScreenPointerEvents('all')
        setTurn(data.yourTurn)
        setTimeout(() => setWinScreenOpacity(100), 2000)
        setTimeout(() => {
          setBlock1('block')
          playStatSound()
        }, 2500)
        setTimeout(() => {
          setBlock2('block')
          playStatSound()
        }, 3000)
        setTimeout(() => {
          setBlock3('block')
          playStatSound()
        }, 3500)
        setTimeout(() => {
          setBlock4('block')
          playStatSound()
        }, 4000)
        setTimeout(() => {
          setBlock5('flex')
          playContinueBtnSound()
        }, 4500)
        } else {
          setBlock1('none')
          setBlock2('none')
          setBlock3('none')
          setBlock4('none')
          setBlock5('none')
        }
    }, [hp, levelState])
  }
  
  useEffect(() => {
    if (levelTurnsStatistic >= 28) setLevelCoinsStatistic(50)
    else if (levelTurnsStatistic >= 22 && levelTurnsStatistic <= 27) setLevelCoinsStatistic(80)
    else setLevelCoinsStatistic(120)
  }, [levelTurnsStatistic])

  handleEnemyHpZero(enemy1HP, 1)
  handleEnemyHpZero(enemy2HP, 2)
  handleEnemyHpZero(enemy3HP, 3)

  return (
    <WinScreenContainer
    style={{
      pointerEvents: winScreenPointerEvents,
      opacity: `${winScreenOpacity}%`
    }}
    >
        <div style={{display: block1}}>{data.win}</div>
        <div style={{display: block2}}>{data.turns}: {levelTurnsStatistic}</div>
        <div style={{display: block3}}>{data.damageReceived}: {levelDamageRecievedStatistic}</div>
        <div style={{display: block4}}>{data.coins}: <span style={{color: 'yellow'}}>+ {levelCoinsStatistic}</span></div>
        
        <ContinueBtnBlock style={{display: block5}}><ContinueButton /></ContinueBtnBlock>
    </WinScreenContainer>
  )
}
