import React from 'react'
import styles from "styled-components";

const Logo = styles.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  gap: 5px;
  color: green;
  font-weight: bold;
  margin-bottom: 25px;
`;
const Report = () => {
  return (
    <Logo>
      <h1>Help</h1>
      <h3>Some common guidelines</h3>
      <p>your negetive report will not shown in page but the positive one shows.</p>
      <p>you can upload your desired video</p>
    
    </Logo>
  )
}

export default Report