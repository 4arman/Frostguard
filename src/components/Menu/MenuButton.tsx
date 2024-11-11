import React from 'react'
import styled from 'styled-components'

import useSound from 'use-sound'
import soundHoverMenuBtn from '../../assets/sounds/menu/hoverBtn.wav'
import soundClickMenuBtn from '../../assets/sounds/menu/clickBtn.wav'

const MenuButtonItem = styled.button`
  width: 80%;
  height: 70px;
  font-size: 26px;
  margin: 8px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 3px solid #2a3b58;
  background: linear-gradient(145deg, #436b95, #2a3b58);
  color: #d2f1fc;
  box-shadow: 0 0 20px rgba(65, 105, 225, 0.7), inset 0 0 10px rgba(255, 255, 255, 0.1);

  &:hover {
    box-shadow: 0 0 35px rgba(173, 216, 230, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.3);
    background: linear-gradient(145deg, #2a3b58, #436b95);
    color: #e0f7fa;
    transform: scale(1.05);
  }

  &:active {
    box-shadow: 0 0 45px rgba(173, 216, 230, 0.9), inset 0 0 25px rgba(255, 255, 255, 0.4);
    background: linear-gradient(145deg, #1b293b, #3e6b95);
    color: #ffffff;
    transform: scale(0.98);
    border: 5px solid #ffffff;
  }
`

interface MenuButtonProps {
  title: string,
  onClick: any
}

const MenuButton: React.FC<MenuButtonProps> = ({ title, onClick }) => {

  const [playSoundHoverMenuBtn] = useSound(soundHoverMenuBtn)
  const [playSoundClickMenuBtn] = useSound(soundClickMenuBtn)

  return (
    <MenuButtonItem 
    onClick={() => {
      playSoundClickMenuBtn()
      onClick()
    }}
    onMouseEnter={() => {
      playSoundHoverMenuBtn()
    }}
    >
      {title}
    </MenuButtonItem>
  )
}

export default MenuButton
