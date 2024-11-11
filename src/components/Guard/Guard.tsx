import styled from "styled-components"
import GuardImg from "../../assets/images/guard/guard.gif"
import { atom, useAtom } from "jotai"

const GuardContainer = styled.div`
  width: 280px;
  height: 280px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 135px;
  left: 6%;
  z-index: 11;
  pointer-events: none;
  cursor: pointer;
`

export const guardImgAtom = atom(GuardImg)

export default function Guard() {

  const [guardImg] = useAtom(guardImgAtom)

  return (
    <GuardContainer
    style={{
      backgroundImage: `url(${guardImg})`
    }}
    >
      
    </GuardContainer>
  )
}
