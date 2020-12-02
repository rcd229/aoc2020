import React from "react";
import { Button as MUIButton } from "@material-ui/core";

const Button = ({ children, onClick, style }) => {
  return (
    <MUIButton
      classes={{ root: "aoc-button "}}
      onClick={onClick}
      style={style}
    >
      {children}
    </MUIButton>
  )
}

export default Button;
