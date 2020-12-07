import React, { useState } from "react";
import { IconButton, Tabs, Tab } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import { challengeList } from "./Challenges/challengeList";

import "./day.scss";

const TabPanel = ({ children, activeTab, index }) => {
  return (
    <div
      className="aoc-day--tab"
      role="tabpanel"
      hidden={activeTab !== index}
    >
      {activeTab === index ? children : null}
    </div>
  );
};

const Day = ({ date, handleClose }) => {
  const [challenge, setChallenge] = useState(0);

  const handleChange = (event, newValue) => {
    setChallenge(newValue);
  };

  return (
    <div className="aoc-day">
      <div className="aoc-day--header">
        <div className="aoc-day--header--top-bar">
          <a href={`https://adventofcode.com/2020/day/${date}`} target="__blank">Day {date} Challenge Link</a>
          <IconButton classes={{ root: 'aoc-day--header--close-button'}} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <Tabs
          classes={{ flexContainer: 'aoc-day--tab-bar' }}
          value={challenge}
          onChange={handleChange}
        >
          <Tab label="Challenge 1" />
          <Tab label="Challenge 2" />
        </Tabs>
      </div>
      <div className="aoc-day--tab-container">
        <TabPanel activeTab={challenge} index={0}>
          {challengeList[date] && challengeList[date].challenge1}
        </TabPanel>
        <TabPanel activeTab={challenge} index={1}>
          {challengeList[date] && challengeList[date].challenge2}
        </TabPanel>
      </div>
    </div>
  )
};

export default Day;
