import styled from "styled-components"
import Game from "./components/Game"
import SnowImg from "./assets/images/snow.gif"
import { MusicProvider } from "./components/Menu/Options/MusicProvider"

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SnowImgItem = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`

export default function App() {
  return (
    <MusicProvider>
    <Container>
      <Game />
      {/* <SnowImgItem src={SnowImg} alt="" /> */}
    </Container>
    </MusicProvider>
  )
}
