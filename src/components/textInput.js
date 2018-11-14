import React from "react";
import PropTypes from "prop-types";
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

TextInput.prototype = {
  // value: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  //   PropTypes.boolean,
  // ]),
  value: PropTypes.any,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  required: PropTypes.boolean,
  type: PropTypes.string,
  onChange: PropTypes.func,

}

export default TextInput;
