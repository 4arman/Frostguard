import styled from "styled-components"
import Enemy2Img from "../../assets/images/enemys/enemy2/enemy2.gif"
import { atom, useAtom } from "jotai"

const Enemy2Container = styled.div`
  width: 350px;
  height: 350px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: 80px;
  right: 6%;
  z-index: 11;
  pointer-events: none;
  cursor: pointer;
`

export const enemy2ImgAtom = atom(Enemy2Img) 

export default function Enemy2() {

  const [enemy2Img] = useAtom(enemy2ImgAtom)

  return (
    <Enemy2Container
    style={{
      backgroundImage: `url(${enemy2Img})`
    }}
    >
        
    </Enemy2Container>
  )
}
