import React, { useEffect } from "react";

import { getPasses, getHighestSeatId, findSeat } from "./boardingPasses";

import "./day5.scss";

const Day5 = () => {
  useEffect(() => {
    const [highestSeatId, ids] = getHighestSeatId(getPasses());
    const yourSeat = findSeat(ids.sort((a,b) => a - b), 0);
  }, []);
  return (
    <div className="day5">
    </div>
  );
};

export default Day5;
