import styled from "styled-components"
import Enemy1Img from "../../assets/images/enemys/enemy1/enemy1.gif"
import { atom, useAtom } from "jotai"

const Enemy1Container = styled.div`
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

export const enemy1ImgAtom = atom(Enemy1Img) 

export default function Enemy1() {

  const [enemy1Img] = useAtom(enemy1ImgAtom)

  return (
    <Enemy1Container
    style={{
      backgroundImage: `url(${enemy1Img})`
    }}
    >
        
    </Enemy1Container>
  )
}
