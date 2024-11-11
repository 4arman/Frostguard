import styled from "styled-components"
import Frostcoins from "./Frostcoins"
import Frostgems from "./Frostgems"

const CurrencyContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 2%;
  top: 2%;
  pointer-events: none;
  background-color: rgba(17, 20, 69, 0.7); 
  border-radius: 10px;
  padding: 10px 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  border: 2px solid #f0f0f0;
  z-index: 1000;
`

export default function Currency() {
  return (
    <CurrencyContainer>
        <Frostcoins />
        <Frostgems />
    </CurrencyContainer>
  )
}
