import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/Card";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useSelector } from "react-redux";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 4px solid ${({ theme }) => theme.soft};
`;
const Title = styled.h2`
font-size: 20px;
font-weight: 1000;

  color: ${({ theme }) => theme.text};
  margin: 20px 20px 20px 20px;
`;

const Home = ({ type }) => {
  const [likevideos, setLikeVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
const userId = currentUser._id;

  useEffect(() => {
    const fetchLikeVideos = async () => {
      const res = await axios.get(`https://youtubeapi-rlw4.onrender.com/api/videos/likes/${userId}`);
      setLikeVideos(res.data);
    };
    fetchLikeVideos();
  }, [userId]);
  const [disvideos, setDisVideos] = useState([]);
  useEffect(() => {
    const fetchDisVideos = async () => {
      const res = await axios.get(`https://youtubeapi-rlw4.onrender.com/api/videos/dislikes`);
      setDisVideos(res.data);
    };
    fetchDisVideos();
  }, []);
  console.log();
  return (
    <>
      <>
        <Title>
          {" "}
          <ThumbUpAltIcon />
          Liked Videos
        </Title>

        <Container>
          {likevideos.map((video, index) => {
            return <Card key={index} video={video} />;
          })}
        </Container>
      </>
      <Hr />
      <>
      <Title>
          {" "}
          <ThumbDownAltIcon  />
          DisLiked Videos
        </Title>
      <Container>
       
          {disvideos.map((video, index) => {
            return <Card key={index} video={video} />;
          })}
        
      </Container>
      </>
    </>
  );
};

export default Home;
