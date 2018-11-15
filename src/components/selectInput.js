import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import FormErrorMessage from './formErrorMessage';
const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;



const SelectInput = ({
  value,
  options = [],
  label,
  errorMessage,
  required,
  onChange
}) =>
  (<StyledInputContainer>
    <TextField
      select
      required={required}
      label={label}
      value={value}
      onChange={onChange}
      error={!!errorMessage}
      margin="none"
      variant="outlined"
      fullWidth
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
    <FormErrorMessage>{errorMessage}</FormErrorMessage>
  </StyledInputContainer>
  );

SelectInput.prototype = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  //value: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired
    })
  ),
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func,

}

export default SelectInput;
