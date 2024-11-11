import { atom, useAtom } from "jotai"
import styled from "styled-components"
import frostcoinImg from "../../../../assets/images/currency/frostcoin.png"

const FrostcoinsContainer = styled.div`
  font-size: 25px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`

const FrostcoinImg = styled.img`
  width: 50px;
`

export const frostcoinsAtom = atom(0)
export const frostcoinsColorAtom = atom('#ffffff')

export default function Frostcoins() {

  const [frostcoins] = useAtom(frostcoinsAtom)
  const [frostcoinsColor] = useAtom(frostcoinsColorAtom)

  return (
    <FrostcoinsContainer
    style={{
      color: frostcoinsColor
    }}
    >
      <FrostcoinImg 
      src={frostcoinImg} 
      alt="frostcoins" 
      />
      {frostcoins}
    </FrostcoinsContainer>
  )
}
