import React, { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left:0;
  // background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: left;
  margin-left: 10rem;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size: 14px;
`;

const Upload = ({ setOpen }) => {
  const {currentUser} = useSelector((state)=>state.user);
  const [name , setName] = useState("");

  const handleChange = async(event)=>{
    await axios.put(`http://localhost:5000/api/users/${currentUser._id}` , {name})
    
  }

  return ( 
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Update Your Profile</Title>
        <Label>Name:</Label>
        
        <Input
          type="text"
          placeholder="Title"
          name="title"
          value={name}
          onChange={(e)=>(setName(e.target.value))}
        />

        
        <Button onClick={handleChange} >Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;