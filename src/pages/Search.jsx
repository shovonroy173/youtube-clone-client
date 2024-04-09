import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await axios.get(
        `http://localhost:5000/api/videos/search${query}`
      );
      setVideos(response.data);
    };
    fetchVideo();
  }, [query]);
  return <Container>{
    videos.map((video , index) => <Card key={index} video={video} />)
    }</Container>;
};

export default Search;
