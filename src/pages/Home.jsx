import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/Card";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Title = styled.h2`
  font-size: 20px;
  font-weight: 1000;
  color: ${({ theme }) => theme.text}; 
  margin: 20px 20px 20px 20px;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`https://youtubeapi-rlw4.onrender.com/api/videos/${type}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);
  // console.log(videos);
  return (
    <>
      <div>
        {type === "latest" ? (
          <>
            <Title>
              {" "}
              <WatchLaterOutlinedIcon  />
              History
            </Title>
          </>
        ) : (
          ""
        )}
      </div>
      <Container>
      {videos.map((video, index) => {
        return <Card key={index} video={video} />;
      })}
      
    </Container>
    </>
  );
};

export default Home;
