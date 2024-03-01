import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
const Title = styled.h1`
  font-size: 30px;
  font-weight: 1000;
  color: ${({ theme }) => theme.text};
`;

const PrivateRoute = ({ loc }) => {
  const { currrentUser } = useSelector((state) => state.user);
  console.log(currrentUser);
  return (
    <div>
      {currrentUser ? (
        <Navigate to={loc} />
      ) : (
        <Title>
          Click to SIGN IN to Login , if you have no account then SignUp
        </Title>
      )}
    </div>
  );
};

export default PrivateRoute;
