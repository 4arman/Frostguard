import styled from "styled-components"
import { atom, useAtom } from "jotai"
import { dataAtom } from "../../data/data"
import loadingScreenImg from "../../assets/images/loadingScreen/loadingScreen.png"

const LoadingScreenContainer = styled.section`
  width: 100%;
  height: 100%;
  transition: 500ms;
  background-image: url(${loadingScreenImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  pointer-events: none;
  position: absolute;
  z-index: 10000;
`

const LoadingText = styled.div`
  font-size: 30px;
  color: #fff;
  position: absolute;
  bottom: 5%;
  right: 5%;
`

type PointerEventsType = 'none' | 'all'
export const loadingScreenOpacityAtom = atom(0)
export const loadingScreenPointerEventsAtom = atom<PointerEventsType>('none')

export default function LoadingScreen() {

  const [data] = useAtom(dataAtom)
  const [loadingScreenOpacity] = useAtom(loadingScreenOpacityAtom)
  const [loadingScreenPointerEvents] = useAtom(loadingScreenPointerEventsAtom)

  return (
    <LoadingScreenContainer 
    style={{
      opacity: loadingScreenOpacity,
      pointerEvents: loadingScreenPointerEvents
    }}
    >
        <LoadingText>{data.loading}...</LoadingText>
    </LoadingScreenContainer>
  )
}
