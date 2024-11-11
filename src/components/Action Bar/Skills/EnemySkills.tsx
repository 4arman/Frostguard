import styled from "styled-components"
import Skill from "./Skill"
import enemySkill1Img from "../../../assets/images/skills/enemySkills/enemy1/skill1.png"
import enemySkill2Img from "../../../assets/images/skills/enemySkills/enemy1/skill2.png"

const EnemySkillsContainer = styled.div`
  width: 130px;
  height: 65px;
  background: linear-gradient(135deg, #7c2e2e, #ff0000);
  border: 2px solid #521c1c;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'MedievalSharp', cursive;
  color: #e0f7fa;
  text-transform: uppercase;
  transition: 300ms;
  border-radius: 10px;
  overflow: hidden;
`;

const EnemySkillsBlock = styled.div`
  width: 130px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const EnemySkillsText = styled.div`
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  font-size: 25px;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function EnemySkills() {
  return (
    <EnemySkillsBlock>
      <EnemySkillsText>Skills</EnemySkillsText>
    <EnemySkillsContainer>
      <Skill 
      img={enemySkill1Img}
      onClick={null}
      onHover={null}
      />
      <Skill
      img={enemySkill2Img}
      onClick={null}
      onHover={null}
      />
    </EnemySkillsContainer>
    </EnemySkillsBlock>
  )
}
