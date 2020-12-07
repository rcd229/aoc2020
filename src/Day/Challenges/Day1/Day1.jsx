import React, { useState, useEffect } from "react";
import { expenseReport } from "./expenseReport";

import "./day1.scss";

const Day1 = ({ challengeNumber }) => {
  const [numbers, setNumbers] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (challengeNumber === 1) {
      findTwo();
    } else {
      findThree();
    }
  }, []);

  const findTwo = () => {
    let pair = null;
    let ind = 0;

    while (!pair && ind < expenseReport.length) {
      const firstNum = expenseReport[ind];
      const secondNum = expenseReport.filter(x => x !== firstNum).find(y => firstNum + y === 2020);
      if (secondNum) {
        pair = [firstNum, secondNum];
      } else {
        ind++;
      }
    }

    if (pair) {
      setNumbers(pair);
      setProduct(pair[0] * pair[1]);
    }
  }

  const findThree = () => {
    let triple = null;
    let ind = 0;

    while (!triple && ind < expenseReport.length - 2) {
      const firstNum = expenseReport[ind];
      let ind2 = ind + 1;

      while (!triple && ind2 < expenseReport.length - 1) {
        const secondNum = expenseReport[ind2];

        const thirdNum = expenseReport
          .slice(ind2 + 1, expenseReport.length)
          .find(y => firstNum + secondNum + y === 2020);

        if (thirdNum) {
          triple = [firstNum, secondNum, thirdNum];
        } else {
          ind2++;
        }
      }

      ind++;
    }

    if (triple) {
      setNumbers(triple);
      setProduct(triple[0] * triple[1] * triple[2]);
    }
  }

  return (
    <div className="aoc-day--day-1">
      <div className="expense-report aoc-day--tab--section">
        <h2>Expense Report</h2>
        {expenseReport.join(",\n")}
      </div>
      <div className="results aoc-day--tab--section">
        <div className="pair">
          <h3>
            The {challengeNumber === 1 ? 'two' : 'three'} numbers that add to 2020 are:
          </h3>
          <div className="numbers">
            {numbers && (<p>{numbers[0]}</p>)}
            {numbers && (<p>{numbers[1]}</p>)}
            {numbers && numbers[2] ? (<p>{numbers[2]}</p>) : null}
          </div>
        </div>
        <div className="product">
          <h3>Product:</h3>
          {product && (<p>{product}</p>)}
        </div>
      </div>
    </div>
  )
};

export default Day1;
