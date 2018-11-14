import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 0 10px 0 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 43px;
  background-color: #5879da;
  color: #fff;
`;

const StyledTitle = styled.div`
  margin-right:10px;
`;

const AppBar = ({ title, logo }) => (
  <StyledContainer>
    <StyledTitle>{title}</StyledTitle>
    <div>{logo}</div>
  </StyledContainer>
);

export default AppBar;
