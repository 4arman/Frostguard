import styled from "styled-components"
import enemyHPImg from "../../../assets/images/hp/enemyHP.png"
import { atom, useAtom } from "jotai"
import { useEffect } from "react"

const Enemy3HPcontainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Enemy3HPimgItem = styled.img`
  width: 100px;
  margin: 5px;
`

const Enemy3HPitem = styled.div`
  font-size: 50px;
  color: #ffffff;
`

export const enemy3HPatom = atom(1000000000)
export const enemy3HpDisplayAtom = atom('none')

export default function Enemy3HP() {

  const [enemy3HP, setEnemy3HP] = useAtom(enemy3HPatom)
  const [enemy3HpDisplay] = useAtom(enemy3HpDisplayAtom)


  useEffect(() => {
    if (enemy3HP < 0) setEnemy3HP(0)
  }, [enemy3HP])

  return (
    <Enemy3HPcontainer 
    style={{
      display: enemy3HpDisplay
    }}>
        <Enemy3HPimgItem src={enemyHPImg}/>
        <Enemy3HPitem>{enemy3HP}</Enemy3HPitem>
    </Enemy3HPcontainer>
  )
}
