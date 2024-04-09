import React, { useState } from "react";
import styled from "styled-components";
import img from "../img/logo.png";

import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Settings from "./Settings";

const Container = styled.div`
  flex: 1;
  background-color:${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  overflow-y: scroll;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 5px 0px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;



const Menu = ({ darkMode, setDarkMode }) => {
  const {currentUser} = useSelector((state)=>state.user);
  const [open, setOpen] = useState(false);
  // console.log(currentUser);
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{textDecoration:"none" , color:"inherit" }} >
        <Logo  >
          <Img src={img} />
          VidVista
        </Logo>
        </Link>
        <Link to="/" style={{textDecoration:"none" , color:"inherit" }} >
        <Item>
          <HomeIcon />
          Home
        </Item>
        </Link>
        <Link to="trends"style={{textDecoration : "none" , color:"inherit"}}  >
        <Item>
          <ExploreOutlinedIcon />
          Explore
        </Item>
        </Link>
        <Link to="subscription"style={{textDecoration : "none" , color:"inherit"}}  >
        <Item  >
          <SubscriptionsOutlinedIcon />
          Subscriptions
        </Item>
        </Link>
        <Hr />
        <Link to="likes"style={{textDecoration : "none" , color:"inherit"}}  >
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        </Link>
        <Link to="latest"style={{textDecoration : "none" , color:"inherit"}}  >
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        </Link>
        
        {currentUser ? (
            ""
          ) : (
            <>
            <Hr />
            Sign in to like videos, comment, and subscribe.
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
            </>
          )}
        
        <Hr />
        <Title>New Feature</Title>
        <Link to="music"style={{textDecoration : "none" , color:"inherit"}}  >
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        </Link>
        <Link to="sports"style={{textDecoration : "none" , color:"inherit"}}  >
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        </Link>
        <Link to="gaming"style={{textDecoration : "none" , color:"inherit"}}  >
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        </Link>
        <Link to="movies"style={{textDecoration : "none" , color:"inherit"}}  >
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        </Link>
        <Link to="news"style={{textDecoration : "none" , color:"inherit"}}  >
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        </Link>
       
        <Hr />
        
        <Item onClick={()=>{setOpen(true)}} >
          <SettingsOutlinedIcon  />
          Settings
        </Item>
        <Link to="help"style={{textDecoration : "none" , color:"inherit"}}  >

        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
        </Link>
        <Item onClick={() => setDarkMode(!darkMode)} >
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
       
      </Wrapper>
      {open &&  <Settings setOpen={setOpen}/>}
    </Container>
   
  );
};

export default Menu;
