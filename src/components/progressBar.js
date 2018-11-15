import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

const StyledCircularProgressContainer = styled.div`
  flex-grow: 1;
`;

const ProgressBar = ({ title, open }) => (
  <Dialog open={open}>
    <DialogTitle>{title}</DialogTitle>
    <StyledCircularProgressContainer>
      <LinearProgress variant="query" />
    </StyledCircularProgressContainer>
  </Dialog>
);

ProgressBar.prototype = {
    title: PropTypes.string,
    open: PropTypes.bool.isRequired
  }

export default ProgressBar;
