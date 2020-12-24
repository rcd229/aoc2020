import React, { useState, useEffect } from "react";
import BagIcon from '@material-ui/icons/LocalMall';

import { code, getAccBeforeLoop, getFixedAcc } from "./gameHelpers";

import "./day8.scss";

const Day8 = () => {
  const [acc, setAcc] = useState(null);
  const [fixedAcc, setFixedAcc] = useState(null);
  const [fixedInstr, setFixedInstr] = useState(null);

  useEffect(() => {
    const [accum, ind] = getAccBeforeLoop(0, 0, [], code);
    const [endAcc, instr] = getFixedAcc();

    setFixedAcc(endAcc);
    setFixedInstr(instr);
    setAcc(accum);
  }, []);

  return (
    <div className="day8">
      <div className="day8--results section">
        <h2>Accumulator before infinite loop: <span>{acc}</span></h2>
        <h2>
          Accumulator with fixed code:
          <span> {fixedAcc}</span>
          <span className="instr"> (fixed instruction: {fixedInstr})</span>
        </h2>
      </div>
    </div>
  );
}

export default Day8;
