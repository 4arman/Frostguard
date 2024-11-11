import styled from "styled-components"
import FrostHpImg from "../../../assets/images/hp/frostHP.png"
import { useEffect } from "react"
import { atom, useAtom } from "jotai"
import { dataAtom } from "../../../data/data"
import { turnAtom } from "../../Level/Turn"
import { loseScreenOpacityAtom, loseScreenPointerEventsAtom } from "../../Screens/LoseScreen/LoseScreen"
import { guardImgAtom } from "../../Guard/Guard"
import guardDeathImg from "../../../assets/images/guard/guardDeath.gif"

const FrostHPcontainer = styled.div`
  width: 20%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 40px;
`

const FrostHPimgItem = styled.img`
  width: 100px;
  margin: 5px;
`

const FrostHPitem = styled.div`
  font-size: 50px;
  color: #ffffff;
`

export const frostHPatom = atom(100)

export default function FrostHP() {

  const [data] = useAtom(dataAtom)
  const [frostHP, setFrostHP] = useAtom(frostHPatom)
  const [guardImg, setGuardImg] = useAtom(guardImgAtom)
  const [turn, setTurn] = useAtom(turnAtom)
  const [, setLoseScreenOpacity] = useAtom(loseScreenOpacityAtom)
  const [, setLoseScreenPointerEvents] = useAtom(loseScreenPointerEventsAtom)

  useEffect(() => {
    if (frostHP <= 0) {
      setFrostHP(0)
      setTurn(data.yourTurn)
      setTimeout(() => setGuardImg(guardDeathImg), 150)
      setLoseScreenPointerEvents('all')
      setTimeout(() => setLoseScreenOpacity(1), 4000)
    }  
  }, [frostHP, setTurn, turn, guardImg, setGuardImg, setLoseScreenPointerEvents])

  return (
    <FrostHPcontainer>
        <FrostHPimgItem src={FrostHpImg}/>
        <FrostHPitem>{frostHP}</FrostHPitem>
    </FrostHPcontainer>
  )
}
