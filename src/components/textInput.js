import React from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import StyledErrorMessage from './formErrorMessage';

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;


const TextInput = ({
  value,
  label,
  errorMessage,
  required,
  type,
  onChange
}) => (
  <StyledInputContainer>
    <TextField
      value={value}
      label={label}
      onChange={onChange}
      error={!!errorMessage}
      required={required}
      margin="none"
      variant="outlined"
      type={type}
      fullWidth
    />
    <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
  </StyledInputContainer>
);

export default TextInput;
