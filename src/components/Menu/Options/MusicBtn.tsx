import styled from "styled-components"
import { useState, useRef, useEffect } from "react"
import { Howl } from "howler"
import musicIcon from "../../../assets/images/menu/musicIcon.png"
import musicOffIcon from "../../../assets/images/menu/musicOffIcon.png"
import menuThemeMusic from "../../../assets/sounds/music/menuTheme.mp3"
import { atom, useAtom } from "jotai"

const MusicBtnItem = styled.img`
  width: auto;
  cursor: pointer;
`

export const musicAtom = atom(menuThemeMusic)

export default function MusicBtn() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [musicIconImg, setMusicIconImg] = useState(musicOffIcon)
  const [music] = useAtom(musicAtom)
  const soundRef = useRef<Howl | null>(null)

  useEffect(() => {
    soundRef.current = new Howl({
      src: [music],
      loop: true,
      volume: 0.6,
    })

    if (isPlaying) {
      soundRef.current.play()
    }

    return () => {
      soundRef.current?.stop()
      soundRef.current?.unload()
      soundRef.current = null
    }
  }, [music])

  const toggleMusic = () => {
    if (isPlaying) {
      soundRef.current?.pause()
      setMusicIconImg(musicOffIcon)
    } else {
      soundRef.current?.play()
      setMusicIconImg(musicIcon)
    }
    setIsPlaying((prev) => !prev)
  }

  return <MusicBtnItem src={musicIconImg} onClick={toggleMusic} />
}
