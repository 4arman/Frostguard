import { atom, useAtom } from "jotai"
import { dataAtom } from "../../data/data"
import styled from "styled-components"

const TurnContainer = styled.div`
  width: 600px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  pointer-events: none;
  text-align: center;
  top: 2%;
  transition: 600ms;
  div {
    margin: 15px;
  }
`

const TurnItem = styled.div`
  width: 150px;
  height: 50px;
  background: linear-gradient(135deg, #2e5b7c, #00e1ff);
  border: 3px solid #1c3a52;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'MedievalSharp', cursive;
  color: #e0f7fa;
  text-transform: uppercase;
  transition: 300ms;
  border-radius: 10px;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`

const GuardText = styled.div`
  font-size: 40px;
  color: #ffffff;
`

const Level1EnemyText = styled.div`
  font-size: 40px;
  color: red;
`

const DamageNumbersItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-size: 250px;
  position: absolute;
  --damageNumColor: #00b3ff;
  color: var(damageNumColor);
  top: -200px;
  left: 0;
  @keyframes damageNumbersAnimation {
    0% {
      color: var(damageNumColor)
    }
    100% {
      color: #ffffff
    }
  }
  animation: damageNumbersAnimation 0.15s infinite;
`

type DamageNumbersType = number | string

export const turnAtom = atom('Your Turn')
export const turnOpacityAtom = atom(100)
export const damageNumbersSymbolAtom = atom('-')
export const damageNumbersDisplayAtom = atom('none')
export const damageNumbersOpacityAtom = atom(1)
export const damageNumbersColorAtom = atom('#00b3ff')
export const damageNumbersAtom = atom<DamageNumbersType>(0)
export const levelTurnsStatisticAtom = atom(0)
export const levelDamageRecievedStatisticAtom = atom(0)
export const levelCoinsStatisticAtom = atom(0)

export default function Turn() {

  const [turn] = useAtom(turnAtom)
  const [turnOpacity] = useAtom(turnOpacityAtom)

  const [data] = useAtom(dataAtom)

  const [damageNumbersDisplay] = useAtom(damageNumbersDisplayAtom)
  const [damageNumbersOpacity] = useAtom(damageNumbersOpacityAtom)
  const [damageNumbersSymbol] = useAtom(damageNumbersSymbolAtom)
  const [damageNumbersColor, setDamageNumbersColor] = useAtom(damageNumbersColorAtom)
  const [damageNumbers] = useAtom(damageNumbersAtom)

  if (turn === data.enemyTurn) setDamageNumbersColor('red')

  return (
    <>
    <TurnContainer
    style={{
      opacity: turnOpacity
    }}
    >
      <GuardText>Guard</GuardText>
      <TurnItem>{turn}</TurnItem>
      <Level1EnemyText>Goblin</Level1EnemyText>
    </TurnContainer>

    <DamageNumbersItem
    style={{
      display: damageNumbersDisplay,
      opacity: damageNumbersOpacity,
      color: damageNumbersColor
    }}
    >
      {damageNumbersSymbol}{damageNumbers}
    </DamageNumbersItem>
    </>
  )
}
