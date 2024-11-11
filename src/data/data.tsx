import { atom } from "jotai";

export const dataAtom = atom(
  {
    loading: 'Loading',
    

    language: 'Language',


    menu: 'Menu',
    mainMenu: 'Main Menu',

    play: 'Play',
    continue: 'Continue',
    retry: 'Retry',
    restart: 'Restart',
    options: 'Options',


    level: 'Level',

    upgrades: 'Upgrades',

    buy: 'Buy',
    coins: 'Coins',

    frostHealthTitle: 'Frost Health Point',
    frostHealthDescription: 'Increase Frost HP by +15',
    swordStrikeTitle: 'Sword Strike',
    swordStrikeDescription: 'Increase sword strike damage (+1) ~ (+2)',
    frostHealTitle: 'Frost Heal',
    frostHealDescription: 'Increase frost heal damage (+1) ~ (+2)',
    freezingTitle: 'Freezing',
    freezingDescription: 'Increase freezing chance (+4%)',
    trueSwordPowerTitle: 'True Sword Power',
    trueSwordPowerDescription: 'Increase true sword power damage (+1) ~ (+3)',

    turns: 'Turns',
    yourTurn: 'Your Turn',
    enemyTurn: 'Enemy Turn',


    skillsPanelTitle: 'Skills',
    
    swordStrikeInfo1: 'Dealing',
    swordStrikeInfo2: 'damage to enemy',
    frostHealInfo1: 'Healing',
    frostHealInfo2: 'frost hp',
    freezingInfo1: "Freez enemy's next 2 turns",
    freezingInfo2: "chance",
    trueSwordPowerInfo1: 'Your next "Sword Strike" deals',
    trueSwordPowerInfo2: 'or',
    trueSwordPowerInfo3: 'damage',

    succes: 'Success',
    fail: 'Fail',

    lose: 'You Lose!',
    win: 'You Win!',
    damageReceived: 'Damage Received'
  }
)
