import React, { useState } from "react";
import { AppBar, Drawer, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";

import "./header.scss";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const getMenu = () => {
    return (
      <div
        className="aoc-menu"
        role="presentation"
        onClick={() => setMenuOpen(false)}
        onKeyDown={() => setMenuOpen(false)}
      >
        hi
      </div>
    );
  };

  return (
    <AppBar position="sticky">
      <Toolbar classes={{ root: 'aoc-header' }}>
        <h1>Advent of Code 2020</h1>
        <IconButton edge="end" aria-label="menu" onClick={() => setMenuOpen(true)}>
          <MenuIcon classes={{ root: 'aoc-header--menu-button' }}/>
        </IconButton>
        <Drawer
          classes={{ root: 'aoc-menu '}}
          anchor='right'
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        >
          {getMenu()}
        </Drawer>
      </Toolbar>
    </AppBar>
  )
};

export default Header;
