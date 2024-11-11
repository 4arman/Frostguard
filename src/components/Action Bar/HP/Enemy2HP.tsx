import styled from "styled-components"
import { atom, useAtom } from "jotai"
import { useEffect } from "react"
import enemyHPImg from "../../../assets/images/hp/enemyHP.png"

const Enemy2HPcontainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Enemy2HPimgItem = styled.img`
  width: 100px;
  margin: 5px;
`

const Enemy2HPitem = styled.div`
  font-size: 50px;
  color: #ffffff;
`

export const enemy2HPatom = atom(1000000000)
export const enemy2HpDisplayAtom = atom('none')

export default function Enemy2HP() {

  const [enemy2HP, setEnemy2HP] = useAtom(enemy2HPatom)
  const [enemy2HpDisplay] = useAtom(enemy2HpDisplayAtom)

  useEffect(() => {
    if (enemy2HP <= 0) {
      setEnemy2HP(0)
    }
  }, [enemy2HP])

  return (
    <Enemy2HPcontainer 
    style={{
      display: enemy2HpDisplay
    }}>
        <Enemy2HPimgItem src={enemyHPImg}/>
        <Enemy2HPitem>{enemy2HP}</Enemy2HPitem>
    </Enemy2HPcontainer>
  )
}
