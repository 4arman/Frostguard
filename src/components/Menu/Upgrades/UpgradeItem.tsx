import React, { useState } from 'react'
import styled from 'styled-components'
import { atom, useAtom } from 'jotai'
import { dataAtom } from '../../../data/data'
import { frostcoinsAtom } from './Currency/Frostcoins'
import { frostcoinsColorAtom } from './Currency/Frostcoins'
import frostcoinImg from "../../../assets/images/currency/frostcoin.png"
import useSound from 'use-sound'
import soundNeedCoins from "../../../assets/sounds/menu/needCoins.wav"
import soundBuyBtnHover from "../../../assets/sounds/menu/buyBtnHover.wav"
import soundPurchase from "../../../assets/sounds/menu/purchase.wav"

export const priceAtom = atom(0)

const Item = styled.div`
  width: 450px;
  height: 160px;
  position: relative;
  border: 3px solid #87CEEB;
  background-color: #1b2735;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
`

const ItemImg = styled.img`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid #87CEEB;
`

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 0 20px;
`

const ItemTitle = styled.div`
  font-size: 22px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: 10px;
`

const ItemDescription = styled.div`
  font-size: 16px;
  color: #bbbbbb;
  text-align: center;
`

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const ItemPrice = styled.div`
  font-size: 18px;
  color: #ffffff;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ItemBtn = styled.button`
  padding: 12px 18px;
  background-color: #87CEEB;
  color: #1b2735;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #6798b7;
  }

  &:active {
    background-color: #446783;
  }
`

const LevelCount = styled.div`
  position: absolute;
  bottom: -10px;
  left: -10px;
  background: #3A506B;
  color: #ffffff;
  padding: 8px 14px;
  font-size: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
`

interface ShopItemProps {
  title: string,
  price: number,
  img: any,
  description: string,
  onPurchase: any
}

const UpgradeItem: React.FC<ShopItemProps> = ({ 
  title, price, img, description, onPurchase 
}) => {
  const [data] = useAtom(dataAtom)
  const [upgradeItemlevelCount, setUpgradeItemlevelCount] = useState(1)

  const [frostcoins, setFrostcoins] = useAtom(frostcoinsAtom)
  const [, setFrostcoinsColor] = useAtom(frostcoinsColorAtom)

  const [playSoundNeedCoins] = useSound(soundNeedCoins)
  const [playSoundBuyBtnHover] = useSound(soundBuyBtnHover)
  const [playSoundPurchase] = useSound(soundPurchase)

  const handlePurchaseBtnClick = () => {
    if (frostcoins >= price) {
      setFrostcoins(pv => pv - price)
      setUpgradeItemlevelCount(pv => pv + 1)
      playSoundPurchase()
      onPurchase()
    } else {
      playSoundNeedCoins()
      setFrostcoinsColor('red')
      setTimeout(() => setFrostcoinsColor('#fff'), 300)
    }
  }

  return (
    <Item>
      <ItemImg src={img} />
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <LevelCount>{data.level} {upgradeItemlevelCount}</LevelCount>
        <ItemBtn onClick={handlePurchaseBtnClick} onMouseEnter={() => playSoundBuyBtnHover()}>{data.buy}</ItemBtn>
        <ItemPrice>{price} <img style={{width: '50px'}} src={frostcoinImg} alt={data.coins} /></ItemPrice>
      </ItemActions>
    </Item>
  )
}

export default UpgradeItem
