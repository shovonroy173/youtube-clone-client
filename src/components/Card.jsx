import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "timeago.js";
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Avatar = styled.p`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: gray;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  console.log("LINE AT 68", video);
  const videoId = video?.userId;
  //  console.log(userId);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/find/${videoId}`
        );
        setChannel(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChannel();
  }, [videoId]);

  console.log("LINE AT 85", channel);
  const channelName = channel?.name || "user";
  return (
    <>
      {currentUser ? (
        <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
          <Container type={type}>
            <Image type={type} src={video.imgUrl} />
            <Details type={type}>
              {channel ? <Avatar>{channelName[0]?.toUpperCase()}</Avatar> : ""}
              <Texts>
                <Title>{video.title}</Title>
                {/* <ChannelName> {channelName}</ChannelName> */}

                <Info>
                  {video.views} views . {format(video.createdAt)}
                </Info>
              </Texts>
            </Details>
          </Container>
        </Link>
      ) : (
        <Container type={type}>
          <Image type={type} src={video.imgUrl} />
          <Details type={type}>
            <Avatar>{channel?.name?.toUpperCase()}</Avatar>
            <Texts>
              <Title>{video.title}</Title>
              <ChannelName> {channel?.name}</ChannelName>
              <Info>
                {video.views} views . {format(video.createdAt)}
              </Info>
            </Texts>
          </Details>
        </Container>
      )}
    </>
  );
};

export default Card;
