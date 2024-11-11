import { useEffect } from "react"
import styled from "styled-components"
import LoadingScreen from "./Screens/LoadingScreen"
import WinScreen from "./Screens/WinScreen/WinScreen"
import LoseScreen from "./Screens/LoseScreen/LoseScreen"
import MainMenu from "./Menu/MainMenu"
import GameMenu from "./Menu/GameMenu"
import Level1 from "./Level/Levels/Level1"
import Level2 from "./Level/Levels/Level2"
import Level3 from "./Level/Levels/Level3"

const GameContainer = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function Game() {

  // Disable Keys
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key !== 'F11' && event.key !== 'F5' && event.key !== 'F12') {
        event.preventDefault()
        event.stopPropagation()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keypress', handleKeyDown)
    window.addEventListener('keyup', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keypress', handleKeyDown)
      window.removeEventListener('keyup', handleKeyDown)
    }
  }, [])

  return (
    <GameContainer>
      <MainMenu />
      <GameMenu />
      <LoadingScreen />
      <WinScreen />
      <LoseScreen />
      <Level1 />
      <Level2 />
      <Level3 />
    </GameContainer>
  )
}
