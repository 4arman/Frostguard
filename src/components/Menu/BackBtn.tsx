import React from 'react'
import styled from 'styled-components'
import { atom, useAtom } from 'jotai'
import useSound from 'use-sound'
import soundBackBtnHover from '../../assets/sounds/menu/backBtnHover.mp3'
import soundBackBtnClick from '../../assets/sounds/menu/backBtnClick.wav'
import BackImg from '../../assets/images/menu/backIcon.png'

const BackBtnItem = styled.div`
  width: 120px;
  height: 100px;
  background-image: url(${BackImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 1%;
  right: 3%;
  cursor: pointer;

  &:hover {
    transform: scale(0.95)
  }
  &:active {
    transform: scale(0.9)
  }
`

interface BackBtnProps {
  onClick: any
}

export const backBtnDisplayAtom = atom('none')

const BackBtn: React.FC<BackBtnProps> = ({onClick}) => {
  
  const [backBtnDisplay] = useAtom(backBtnDisplayAtom)

  const [playSoundBackBtnHover] = useSound(soundBackBtnHover)
  const [playSoundBackBtnClick] = useSound(soundBackBtnClick)

  return (
    <BackBtnItem 
    onClick={() => {
      onClick()
      playSoundBackBtnClick()
    }}
    onMouseEnter={() => playSoundBackBtnHover()}
    style={{
      display: backBtnDisplay
    }}
    />
  )
}

export default BackBtn
