import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 43px;
  border-bottom: solid 1px #00000017;
  padding-bottom:10px;
  margin-bottom:10px;
`;

const StyledLabel = styled.div`
  font-weight: bold;
  font-size: ${props => props.fontSize || '18px'};
  margin: 0 5px 0 5px;
`;



const Title = ({ text, icon,fontSize }) => (
  <StyledContainer>
    <div>{icon}</div>
    <StyledLabel fontSize={fontSize}>{text}</StyledLabel>
  </StyledContainer>
);

export default Title;
