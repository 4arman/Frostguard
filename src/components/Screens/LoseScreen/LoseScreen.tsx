import styled from 'styled-components'
import RetryButton from './RetryBtn'
import { atom, useAtom } from 'jotai'
import { dataAtom } from '../../../data/data'
import { levelTurnsStatisticAtom } from '../../Level/Turn'
import MainMenuBtn from './MainMenuBtn'

const LoseScreenContainer = styled.section`
  width: 100%;
  height: 100%;
  transition: 500ms;
  background: #3d1313c9;
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
    font-size: 50px;
    color: #ffffff;
  }
`

const RetryBtnBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

type PointerEventsType = 'none' | 'all'
export const loseScreenPointerEventsAtom = atom<PointerEventsType>('none')
export const loseScreenOpacityAtom = atom(0)

export default function LoseScreen () {

  const [data] = useAtom(dataAtom)
  const [loseScreenOpacity] = useAtom(loseScreenOpacityAtom)
  const [loseScreenPointerEvents] = useAtom(loseScreenPointerEventsAtom)
  const [levelTurnsStatistic] = useAtom(levelTurnsStatisticAtom)

  return (
    <LoseScreenContainer
    style={{
      pointerEvents: loseScreenPointerEvents,
      opacity: loseScreenOpacity
    }}
    >
        <div>{data.lose}</div>
        <div>{data.turns}: {levelTurnsStatistic}</div>
        <RetryBtnBlock>
          <RetryButton />
          <MainMenuBtn />
        </RetryBtnBlock>
    </LoseScreenContainer>
  )
}
