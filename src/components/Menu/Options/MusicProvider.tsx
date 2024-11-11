import React, { createContext, useContext, useRef } from "react"
import { Howl } from "howler"

const MusicContext = createContext<{
  playMusic: (src: string) => void
  stopMusic: () => void
} | null>(null)

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const soundRef = useRef<Howl | null>(null)

  const playMusic = (src: string) => {
    if (soundRef.current) {
      soundRef.current.stop()
    }

    soundRef.current = new Howl({
      src: [src],
      loop: true,
      volume: 0.6,
    })

    soundRef.current.play()
  }

  const stopMusic = () => {
    soundRef.current?.stop()
  }

  return (
    <MusicContext.Provider value={{ playMusic, stopMusic }}>
      {children}
    </MusicContext.Provider>
  )
}

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}
