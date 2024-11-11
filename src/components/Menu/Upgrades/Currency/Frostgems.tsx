import { atom, useAtom } from "jotai"
import styled from "styled-components"
import frostgemImg from "../../../../assets/images/currency/frostgem.png"

const FrostgemsContainer = styled.div`
  font-size: 25px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`

const FrostgemImg = styled.img`
  width: 50px;
`

export const frostgemsAtom = atom(0)

export default function Frostgems() {

  const [frostgems] = useAtom(frostgemsAtom)

  return (
    <FrostgemsContainer title="Frostgems">
      <FrostgemImg src={frostgemImg} alt="frostgems" />
      {frostgems}
    </FrostgemsContainer>
  )
}
