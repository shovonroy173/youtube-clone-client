import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";
import { Button } from "@mui/material";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// const Avatar = styled.img`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
// `;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Avatar = styled.p`
  width: 50px;
  height: 40px;
  border-radius: 100%;
  background-color: gray;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;
const Comments = ({videoId}) => {

  const  {currentUser}  = useSelector((state) => state.user);
const userId = currentUser._id;
  const [comments, setComments] = useState([]);
  const [addComments, setAddComments] = useState("");

  useEffect(() => { 
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://youtubeapi-rlw4.onrender.com/api/comments/${videoId}`
        );
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);
  console.log( "LINE AT 49", comments);

  //TODO: ADD NEW COMMENT FUNCTIONALITY
  const handleComment = async()=>{
   
    await axios.post(
      `https://youtubeapi-rlw4.onrender.com/api/comments/`  , { userId , 
         videoId , desc:addComments  }
    );
    console.log(addComments , videoId);
    setAddComments("");
  }
//  useEffect(()=>{
//   handleComment();
//  } , [])


  return (
    <Container>
      <NewComment>
        <Avatar>{currentUser?.name[0]}</Avatar>
        <Input placeholder="Add a comment..." value={addComments}  onChange={(e)=>{setAddComments(e.target.value)}} />
        <Button onClick={handleComment} >Comment</Button>
      </NewComment>
      {comments?.map(comment=>(
        <Comment key={comment._id} comment={comment}/>     
      ))}
    </Container>
  );
};

export default Comments;