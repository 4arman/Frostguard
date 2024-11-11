import styled from "styled-components"
import platform1Img from "../assets/images/platforms/platform1.png"
import { atom, useAtom } from "jotai"

const PlatformContainer = styled.div`
  width: 100%;
  height: 250px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  z-index: 10;
  top: 360px;
`

export const platformImgAtom = atom(platform1Img)

export default function Platform() {

  const [platformImg] = useAtom(platformImgAtom)

  return (
    <PlatformContainer 
    style={{
      backgroundImage: `url(${platformImg})`
    }}
    >
    </PlatformContainer>
  )
}
