import styled from "styled-components"
import enemyHPImg from "../../../assets/images/hp/enemyHP.png"
import { atom, useAtom } from "jotai"
import { useEffect } from "react"

const Enemy1HPcontainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Enemy1HPimgItem = styled.img`
  width: 100px;
  margin: 5px;
`

const Enemy1HPitem = styled.div`
  font-size: 50px;
  color: #ffffff;
`

export const enemy1HPatom = atom(100000)
export const enemy1HpDisplayAtom = atom('flex')

export default function Enemy1HP() {

  const [enemy1HP, setEnemy1HP] = useAtom(enemy1HPatom)
  const [enemy1HpDisplay] = useAtom(enemy1HpDisplayAtom)

  useEffect(() => {
    if (enemy1HP < 0) setEnemy1HP(0)
  }, [enemy1HP])

  return (
    <Enemy1HPcontainer 
    style={{
      display: enemy1HpDisplay
    }}>
        <Enemy1HPimgItem src={enemyHPImg}/>
        <Enemy1HPitem>{enemy1HP}</Enemy1HPitem>
    </Enemy1HPcontainer>
  )
}
