import React from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import StyledErrorMessage from './formErrorMessage';

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;



const SelectInput = ({
  value,
  options=[],
  label,
  errorMessage,
  required,
  onChange
}) => (
    <StyledInputContainer>
  <TextField
    select
    label={label}
    value={value}
    onChange={onChange}
    error={!!errorMessage}
    margin="none"
    variant="outlined"
    fullWidth
    inputProps={{required}}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </TextField>
  <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
  </StyledInputContainer>
);

export default SelectInput;
