import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { format } from "timeago.js";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import Recommendation from "../components/Recommendation";
import Card from "../components/Card";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { useLocation } from "react-router-dom";
import { subscription } from "../redux/userSlice";
// import Comments from "../components/Comments";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;


const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;
// const Recommendation = styled.div`
//   flex: 2;
// `;

const Video = () => {
  const {currentUser}  = useSelector((state) => state.user);
  const  {currentVideo}  = useSelector((state) => state.video);
  console.log(currentVideo?._id);

  const path = useLocation().pathname.split("/")[2];
  // console.log(path);
  const dispatch = useDispatch();


  const [channel, setChannel] = useState({});
  const [view, setView] = useState(false);
  console.log(currentVideo);
  // console.log(channel);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          `https://youtubeapi-rlw4.onrender.com/api/videos/find/${path}`
        );
        const channelRes = await axios.get(
          `https://youtubeapi-rlw4.onrender.com/api/users/find/${videoRes.data.userId}`
        );
        
        dispatch(fetchSuccess(videoRes.data));
        setChannel(channelRes.data);
        setView(true);
        console.log(videoRes);
      } catch (error) {
        console.log(error);
      }
    }; 
    fetchData();
  } , [path]);
useEffect(()=>{
  const fetchView = async () => {
    if(view){
   await axios.put(
    `https://youtubeapi-rlw4.onrender.com/api/videos/view/${currentVideo?._id}`
  );
    }
  
}
  fetchView()
} , [view , 
  currentVideo?._id
])
  const handleLike = async () => {
    await axios.put(`https://youtubeapi-rlw4.onrender.com/api/users/like/${currentVideo._id}` , {
      headers:{
        token: currentUser.accessToken
      }
    });
    dispatch(like
      (currentUser._id)
    );
  };
  const handleDisLike = async () => {
    await axios.put(
      `https://youtubeapi-rlw4.onrender.com/api/users/dislike/${currentVideo?._id}` , {
        headers:{
          token: currentUser.accessToken
        }
      }
    );
    dispatch(dislike
      (currentUser?._id)
    );
  };
  const handleSub = async () => {
    currentUser.subscribedUsers?.includes(channel._id)
      ? await axios.put(
          `https://youtubeapi-rlw4.onrender.com/api/users/unsubscribe/${channel._id}` , {
            headers:{
              token: currentUser.accessToken
            }
          }
        )
      : await axios.put(
          `https://youtubeapi-rlw4.onrender.com/api/users/subscribe/${channel._id}` , 
        );

    dispatch(subscription(channel._id));
  };
  // console.log("currentVideo" , currentVideo.tags)
  return (
   <Container>
      <Content>
        <VideoWrapper>
        <VideoFrame src=
       
       {currentVideo?.videoUrl}
         controls />
        </VideoWrapper>

        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDisLike}>
              {currentVideo?.likes?.includes(currentUser?._id) ? (
                <ThumbDownOffAltOutlinedIcon />
              ) : (
                <ThumbDownIcon />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image
              src={
                "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              }
            />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
          {currentUser?.subscribedUsers?.includes(channel._id)
              ? ( "SUBSCRIBED"
                )
              : "SUBSCRIBE"} 
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
       
    </Container>
  );
};

export default Video;
