import React from "react";
import { Button as MUIButton } from "@material-ui/core";

const Button = ({ children, onClick, style, className, selected }) => {
  return (
    <MUIButton
      classes={{ root: `aoc-button ${selected || ''} ${className || ''}`}}
      onClick={onClick}
      style={style}
    >
      {children}
    </MUIButton>
  )
}

export default Button;
