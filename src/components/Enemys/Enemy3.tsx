import styled from "styled-components"
import Enemy3Img from "../../assets/images/enemys/enemy3/enemy3.gif"
import { atom, useAtom } from "jotai"

const Enemy3Container = styled.div`
  width: 450px;
  height: 450px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  top: -30px;
  right: 6%;
  z-index: 11;
  pointer-events: none;
  cursor: pointer;
`

export const enemy3ImgAtom = atom(Enemy3Img) 

export default function Enemy3() {

  const [enemy3Img] = useAtom(enemy3ImgAtom)

  return (
    <Enemy3Container
    style={{
      backgroundImage: `url(${enemy3Img})`
    }}
    >
        
    </Enemy3Container>
  )
}
