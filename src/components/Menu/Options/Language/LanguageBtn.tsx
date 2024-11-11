import React from 'react'
import styled from 'styled-components'
import { useAtom } from 'jotai'
import { dataAtom } from '../../../../data/data'
import { currentLangTextAtom } from './Language'

const LanguageButtonItem = styled.button`
  width: 180px;
  height: 100px;
  font-size: 20px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #e0f8ff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  background: linear-gradient(145deg, #4a6073, #8fb2d4);
  border: 2px solid rgba(180, 220, 255, 0.8);
  box-shadow: 0 0 25px rgba(0, 150, 255, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.3);

  &:hover {
    background: linear-gradient(145deg, #92c5e5, #4a6073);
    color: #c9e8ff;
    box-shadow: 0 10px 40px rgba(0, 150, 255, 1), inset 0 0 20px rgba(255, 255, 255, 0.5);
    border-color: rgba(130, 200, 255, 0.9);
    text-shadow: 0 0 15px rgba(255, 255, 255, 1);
  }

  &:active {
    box-shadow: 0 0 50px rgba(0, 150, 255, 1), inset 0 0 30px rgba(255, 255, 255, 0.6);
    background: linear-gradient(145deg, #739db3, #3b5063);
    color: #dff4ff;
    border-color: rgba(100, 160, 220, 1);
  }
`
interface LanguageBtnProps {
  title: string,
  language: any
}

const LanguageBtn: React.FC<LanguageBtnProps> = ({language, title}) => {

  const [, setData] = useAtom(dataAtom)
  const [, setCurrentLanguageText] = useAtom(currentLangTextAtom)

  return (
    <LanguageButtonItem
    onClick={() => {
      setData(language)
      setCurrentLanguageText(title)
    }}
    >
        {title}
    </LanguageButtonItem>
  )
}

export default LanguageBtn
