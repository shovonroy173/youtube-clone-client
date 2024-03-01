import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Help from "./pages/Help";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: 1000;
  color: ${({ theme }) => theme.text};
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper> 
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={ currentUser ? (
                        <Home type="trend" />
                      ) : (
                        <Title>
                          Click to SIGN IN to Login , if you have no account
                          then SignUp
                        </Title>
                      )} />
                  <Route
                    path="subscription"
                    element={
                      currentUser ? (
                        <Home type="sub" />
                      ) : (
                        <Title>
                          Click to SIGN IN to Login , if you have no account
                          then SignUp
                        </Title>
                      )
                    }
                  />
                  <Route
                    path="search"
                    element={
                      currentUser ? (
                       <Search/>
                      ) : (
                        <Title>
                          Click to SIGN IN to Login , if you have no account
                          then SignUp
                        </Title>
                      )
                    }
                  />
                  <Route
                    path="trends"
                    element={
                      currentUser ? (
                        <Home type="trends" />
                      ) : (
                        <Title>
                          Click to SIGN IN to Login , if you have no account
                          then SignUp
                        </Title>
                      )
                    }
                  />
                  <Route
                    path="likes"
                    element={
                      currentUser ? (
                        
                        <Library/>
                      ) : (
                        <Title>
                          Click to SIGN IN to Login , if you have no account
                          then SignUp
                        </Title>
                      )
                    }
                  />
                  <Route
                    path="latest"
                    element={
                      currentUser ? (
                        <Home type="latest" />
                      ) : (
                        <Title>
                          Click to SIGN IN to Login , if you have no account
                          then SignUp
                        </Title>
                      )
                    }
                  />
                   <Route
                    path="music"
                    element={
                      currentUser ? (
                        <Home type="music" />
                      ) : (
                        <Title>
                          Click to SIGN IN to Login , if you have no account
                          then SignUp
                        </Title>
                      )
                    }
                  />
                  <Route
                    path="sports"
                    element={
                      currentUser ? (
                        <Home type="sports" />
                      ) : (
                        <Title>
                          Click to SIGN IN to Login , if you have no account
                          then SignUp
                        </Title>
                      )
                    }
                  />
                  <Route
                    path="gaming"
                    element={
                      currentUser ? (
                        <Home type="gaming" />
                      ) : (
                        <Title>
                          Click to SIGN IN to Login , if you have no account
                          then SignUp
                        </Title>
                      )
                    }
                  /><Route
                  path="movies"
                  element={
                    currentUser ? (
                      <Home type="movies" />
                    ) : (
                      <Title>
                        Click to SIGN IN to Login , if you have no account
                        then SignUp
                      </Title>
                    )
                  }
                />
                <Route
                path="news"
                element={
                  currentUser ? (
                    <Home type="news" />
                  ) : (
                    <Title>
                      Click to SIGN IN to Login , if you have no account
                      then SignUp
                    </Title>
                  )
                }
              />
              <Route
                path="help"
                element={
                  currentUser ? (
                    <Help/>
                  ) : (
                    <Title>
                      Click to SIGN IN to Login , if you have no account
                      then SignUp
                    </Title>
                  )
                }
              />
                  <Route
                    path="signin"
                    element={currentUser ? <Home /> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
