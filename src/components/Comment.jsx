import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [open, setOpen] = useState(false);
  const [setData, setSetData] = useState(false);

  console.log("LINE AT 48", channel);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `https://youtubeapi-rlw4.onrender.com/api/users/find/${comment?.userId}`
      );
      setChannel(res.data);
    };
    fetchUser();
  }, [comment?.userId]);
  console.log("LINE AT 62", comment);
  const comm = comment.desc;

  const userId = currentUser._id;
  const handleDelete = async () => {
    await axios.delete(
      `https://youtubeapi-rlw4.onrender.com/api/comments/${currentVideo?._id}`,
      { userId, comm }
    );
  };
useEffect(()=>{
  setOpen(currentUser._id === comment.userId ? true : false);
} , [currentUser._id , comment.userId])
  

  const channelName = (channel) ? channel?.name : "user";

  return (
    <Container>
       <Avatar src={channelName[0]} />
      <Details>
        {channel && (
          <Name>
            {channelName} <Date>{format(comment?.createdAt)}</Date>
          </Name>
        )}

        <Text>{comment.desc}</Text>
        {open ? <Button onClick={handleDelete}>Delete</Button> : ""}
      </Details>
    </Container>
  );
};

export default Comment;
