import React, { useState, useEffect } from "react";

import { decipherXmas } from "./decipher";

import "./day9.scss";

const Day9 = () => {
  const [invalid, setInvalid] = useState(null);

  useEffect(() => {
    setInvalid(decipherXmas());
  }, []);


  return (
    <div className="day9">
      <div className="results section">
        <h2>First invalid number: <span>{invalid}</span></h2>
      </div>
    </div>
  );
};

export default Day9;
