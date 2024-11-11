import styled from "styled-components"
import Currency from "./Currency/Currency"
import UpgradeItem from "./UpgradeItem"

import frostHpUpgradeImg from "../../../assets/images/hp/frostHP.png"
import upgrade1Img from "../../../assets/images/skills/guardSkills/swordStrike.png"
import upgrade2Img from "../../../assets/images/skills/guardSkills/frostHeal.png"
import upgrade3Img from "../../../assets/images/skills/guardSkills/freezing.png"
import upgrade4Img from "../../../assets/images/skills/guardSkills/trueSwordPower.png"

import { useEffect } from "react"
import { atom, useAtom } from "jotai"
import { dataAtom } from "../../../data/data"
import { frostHPatom } from "../../Action Bar/HP/FrostHP"
import { freezingChanceAtom, freezingLevelAtom, frostHealLevelAtom, frostHealValue1Atom, frostHealValue2Atom, swordStrikeLevelAtom, swordStrikeValue1Atom, swordStrikeValue2Atom, trueSwordPowerLevelAtom, trueSwordPowerValue1Atom, trueSwordPowerValue2Atom } from "../../Action Bar/Skills/Skills"

const UpgradesContainer = styled.div`
  width: 80%;
  height: 520px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #1f2b38;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
`

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h2`
  color: #87ceeb;
  font-size: 32px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 15px;
  font-family: 'font-game-title';
`

const UpgradesGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  justify-items: center;
  overflow-x: auto;
  overflow-y: hidden;
`

export const upgradesDisplayAtom = atom('none')
export const newFrostHpAtom = atom(115)

export default function Upgrades() {

  const [upgradesDisplay] = useAtom(upgradesDisplayAtom)

  const [data] = useAtom(dataAtom)
  
  const [, setFrostHP] = useAtom(frostHPatom)

  const [, setSwordStrikeValue1] = useAtom(swordStrikeValue1Atom)
  const [, setSwordStrikeValue2] = useAtom(swordStrikeValue2Atom)
  const [, setFreezingChance] = useAtom(freezingChanceAtom) 
  const [, setFrostHealValue1] = useAtom(frostHealValue1Atom)
  const [, setFrostHealValue2] = useAtom(frostHealValue2Atom)
  const [, setTrueSwordPowerValue1] = useAtom(trueSwordPowerValue1Atom)
  const [, setTrueSwordPowerValue2] = useAtom(trueSwordPowerValue2Atom)
  const [, setSwordStrikeLevel] = useAtom(swordStrikeLevelAtom)
  const [, setFrostHealLevel] = useAtom(frostHealLevelAtom)
  const [, setFreezingLevel] = useAtom(freezingLevelAtom)
  const [, setTrueSwordPowerLevel] = useAtom(trueSwordPowerLevelAtom)

  const [newFrostHP, setNewFrostHP] = useAtom(newFrostHpAtom)

  useEffect(() => {
    if (upgradesDisplay !== 'none') {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [upgradesDisplay])

  return (
    <UpgradesContainer style={{ display: upgradesDisplay }}>

      <HeaderContainer>
        <Currency />
        <Title>{data.upgrades}</Title>
      </HeaderContainer>

      <UpgradesGrid>
        <UpgradeItem 
          title={data.frostHealthTitle}
          description={data.frostHealthDescription}
          img={frostHpUpgradeImg}
          price={50}
          onPurchase={() => {
            setNewFrostHP(pv => pv + 15)
            setFrostHP(newFrostHP)
          }}
        />
        <UpgradeItem 
          title={data.swordStrikeTitle}
          description={data.swordStrikeDescription}
          img={upgrade1Img}
          price={20}
          onPurchase={() => {
            setSwordStrikeValue1(pv => pv + 1)
            setSwordStrikeValue2(pv => pv + 2)
            setSwordStrikeLevel(pv => pv + 1)
          }}
        />
        <UpgradeItem 
          title={data.frostHealTitle}
          description={data.frostHealDescription}
          img={upgrade2Img}
          price={80}
          onPurchase={() => {
            setFrostHealValue1(pv => pv + 1)
            setFrostHealValue2(pv => pv + 2)
            setFrostHealLevel(pv => pv + 1)
          }}
        />
        <UpgradeItem 
          title={data.freezingTitle}
          description={data.freezingDescription}
          img={upgrade3Img}
          price={50}
          onPurchase={() => {
            setFreezingChance(pv => pv + 0.04)
            setFreezingLevel(pv => pv + 1)
          }}
        />
        <UpgradeItem 
          title={data.trueSwordPowerTitle}
          description={data.trueSwordPowerDescription}
          price={80}
          img={upgrade4Img}
          onPurchase={() => {
            setTrueSwordPowerValue1(pv => pv + 1)
            setTrueSwordPowerValue2(pv => pv + 3)
            setTrueSwordPowerLevel(pv => pv + 1)
          }}
        />
      </UpgradesGrid>
    </UpgradesContainer>
  )
}
