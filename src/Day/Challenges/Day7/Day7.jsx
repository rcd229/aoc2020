import React, { useState, useEffect } from "react";

import { getBagRules, findContainingBags, findContainedBags } from './bagHelpers';

import "./day7.scss";

const Day7 = () => {
  const [bagRules, setBagRules] = useState(null);
  const [containingBags, setContainingBags] = useState([]);
  const [containedBags, setContainedBags] = useState(0);

  useEffect(() => {
    const rules = getBagRules();
    const containing = findContainingBags("shiny gold", rules, []);
    const contained = findContainedBags("shiny gold", rules);

    setBagRules(rules);
    setContainingBags(containing);
    setContainedBags(contained);
  }, []);


  return (
    <div className="day7">
      <div className="day7--results section">
        <h2><span>{containingBags.length}</span> bags can contain at least 1 shiny gold bag</h2>
        <h2>1 shiny gold bag contains <span>{containedBags}</span> bags</h2>
      </div>
      <div className="day7--input section">
      </div>
    </div>
  );
};

export default Day7;
