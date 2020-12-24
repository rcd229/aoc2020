import React, { useState, useEffect } from "react";

import Button from "../../../Components/Button";

import { solveEquations } from "./weirdMaths";

import "./Day18.scss";

const Day18 = () => {
  const [sum, setSum] = useState(0);
  const [advancedSum, setAdvancedSum] = useState(0);
  const [input, setInput] = useState('');
  const [inputSolution, setInputSolution] = useState(null);

  useEffect(() => {
    setSum(solveEquations());
    setAdvancedSum(solveEquations(true));
  }, []);

  const handleInput = event  => {
    setInput(event.target.value);
  }

  const solveInput = advanced => {
    const empty = !input || (input && input.trim() === '');
    const notAnEquation = input.match(/[^\d\s+\*\(\)]/g);
    const sameNumParens = input.match(/\(/g) === input.match(/\)/g);
    if (!(empty || notAnEquation || !sameNumParens)) {
      setInputSolution(solveEquations(advanced, input.replace(/\s+/g,' ')));
    } else {
      const errorMessage = empty ? 'Please enter an equation'
        : notAnEquation ? 'This is not an equation!'
        : 'You have mismatched parentheses :('

      const error = (
        <p className="error">
          {errorMessage}
        </p>
      );
      setInputSolution(error);
    }
  }

  return (
    <div className="day18">
      <h1>Weird Maths</h1>
      <h2>Sum: <span>{sum}</span></h2>
      <h2>Advanced Sum: <span>{advancedSum}</span></h2>
      <div className="day18__interactive">
        <div className="day18__interactive__input">
          <textarea
            placeholder="Enter your weird maths here! (Numbers and operators must be separated by spaces)"
            value={input}
            onChange={handleInput}
          />
          <Button onClick={() => solveInput()}>
            Solve Basic Weirdness
          </Button>
          <Button onClick={() => solveInput(true)}>
            Solve Advanced Weirdness
          </Button>
        </div>
        <div className="day18__interactive__solution">
          {inputSolution}
        </div>
      </div>
    </div>
  );
};

export default Day18;
