import styled from "styled-components"
import LevelSelectButton from "./LevelSelectButton"
import { atom, useAtom } from "jotai"
import { useEffect, useRef } from "react"
import { levelStateAtom } from "../LevelState"
import { level1DisplayAtom } from "../Levels/Level1"
import { level2DisplayAtom } from "../Levels/Level2"
import { level3DisplayAtom } from "../Levels/Level3"
import { enemy1HPatom } from "../../Action Bar/HP/Enemy1HP"
import { enemy2HPatom, enemy2HpDisplayAtom } from "../../Action Bar/HP/Enemy2HP"
import { enemy3HPatom, enemy3HpDisplayAtom } from "../../Action Bar/HP/Enemy3HP"

import { platformImgAtom } from "../../Platform"
import platform2Img from "../../../assets/images/platforms/platform2.png"
import platform3Img from "../../../assets/images/platforms/platform3.png"

import { useMusic } from "../../Menu/Options/MusicProvider"
import { Howl } from "howler"
import menuThemeMusic from "../../../assets/sounds/music/menuTheme.mp3"
import battleTheme1Music from "../../../assets/sounds/music/battleTheme1.mp3"

const LevelSelectContainer = styled.section`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`

type PointerEventsType = 'all' | 'none'
export const level1SelectBtnPointerEventsAtom = atom<PointerEventsType>('all')
export const level2SelectBtnPointerEventsAtom = atom<PointerEventsType>('none')
export const level3SelectBtnPointerEventsAtom = atom<PointerEventsType>('none')
export const level4SelectBtnPointerEventsAtom = atom<PointerEventsType>('none')

export const level1SelectBtnBrightnessAtom = atom(100)
export const level2SelectBtnBrightnessAtom = atom(50)
export const level3SelectBtnBrightnessAtom = atom(50)
export const level4SelectBtnBrightnessAtom = atom(50)

export const levelSelectDisplayAtom = atom('none')

export const currentMusicAtom = atom(menuThemeMusic)

export default function LevelSelect() {

  const { } = useMusic()

  const [levelSelectDisplay] = useAtom(levelSelectDisplayAtom)
  const [, setLevel1Display] = useAtom(level1DisplayAtom)
  const [, setLevel2Display] = useAtom(level2DisplayAtom)
  const [, setLevel3Display] = useAtom(level3DisplayAtom)

  const [levelState, setLevelState] = useAtom(levelStateAtom)

  const [, setPlatformImg] = useAtom(platformImgAtom)

  const [, setEnemy1HP] = useAtom(enemy1HPatom)
  const [, setEnemy2HP] = useAtom(enemy2HPatom)
  const [, setEnemy2HpDisplay] = useAtom(enemy2HpDisplayAtom)
  const [, setEnemy3HP] = useAtom(enemy3HPatom)
  const [, setEnemy3HpDisplay] = useAtom(enemy3HpDisplayAtom)

  const [level1SelectBtnPointerEvents] = useAtom(level1SelectBtnPointerEventsAtom)
  const [level2SelectBtnPointerEvents] = useAtom(level2SelectBtnPointerEventsAtom)
  const [level3SelectBtnPointerEvents] = useAtom(level3SelectBtnPointerEventsAtom)
  const [level4SelectBtnPointerEvents] = useAtom(level4SelectBtnPointerEventsAtom)

  const [level1SelectBtnBrightness] = useAtom(level1SelectBtnBrightnessAtom)
  const [level2SelectBtnBrightness] = useAtom(level2SelectBtnBrightnessAtom)
  const [level3SelectBtnBrightness] = useAtom(level3SelectBtnBrightnessAtom)
  const [level4SelectBtnBrightness] = useAtom(level4SelectBtnBrightnessAtom)

  const [currentMusic, setCurrentMusic] = useAtom(currentMusicAtom)
  const soundRef = useRef<Howl | null>(null)

  useEffect(() => {
    const stopCurrentMusic = () => {
      if (soundRef.current) {
        soundRef.current.stop()
        soundRef.current.unload()
        soundRef.current = null
      }
    }

    const playNewMusic = (src: string) => {
      stopCurrentMusic()
      soundRef.current = new Howl({
        src: [src],
        loop: true,
        volume: 0.6,
      })
      soundRef.current.play()
    }

    if (currentMusic) {
      playNewMusic(currentMusic)
    }

    return () => {
      stopCurrentMusic()
    }
  }, [currentMusic])

  return (
    <LevelSelectContainer 
    style={{
      display: levelSelectDisplay
    }}>
      <LevelSelectButton 
      levelNumber={1}
      onClick={() => {
        setLevel1Display('flex')
        setCurrentMusic(battleTheme1Music)
        if (levelState === 0) {
          setLevelState(1)
          setEnemy1HP(100)
        }
      }}
      pointerEvents={level1SelectBtnPointerEvents}
      brightness={level1SelectBtnBrightness}
      />
      <LevelSelectButton 
      levelNumber={2}
      onClick={() => {
        setLevel1Display('none')
        setLevel2Display('flex')
        setEnemy2HpDisplay('flex')
        setPlatformImg(platform2Img)
        if (levelState === 0) {
          setLevelState(2)
          setEnemy2HP(120)
        }
      }}
      pointerEvents={level2SelectBtnPointerEvents}
      brightness={level2SelectBtnBrightness}
      />
      <LevelSelectButton 
      levelNumber={3}
      onClick={() => {
        setLevel2Display('none')
        setLevel3Display('flex')
        setEnemy3HpDisplay('flex')
        setPlatformImg(platform3Img)
        if (levelState === 0) {
          setLevelState(3)
          setEnemy3HP(150)
        }
      }}
      pointerEvents={level3SelectBtnPointerEvents}
      brightness={level3SelectBtnBrightness}
      />
      <LevelSelectButton 
      levelNumber={4}
      onClick={null}
      pointerEvents={level4SelectBtnPointerEvents}
      brightness={level4SelectBtnBrightness}
      />
    </LevelSelectContainer>
  )
}
