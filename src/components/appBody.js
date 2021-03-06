import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 800px;
  margin:20px auto ;
  padding:10px;
`;

const AppBody = props => <StyledContainer>{props.children}</StyledContainer>;

export default AppBody;
