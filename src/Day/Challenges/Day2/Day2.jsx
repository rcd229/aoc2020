import React, { useState, useEffect } from "react";

import { passwords } from "./passwords";

import "./day2.scss";

const Day2 = ({ challengeNumber }) => {
  const [badPws, setBadPws] = useState([]);
  const [goodPws, setGoodPws] = useState([]);

  useEffect(() => {
    const pwData = passwords.split("\n");
    processPwData(pwData);
  }, []);

  const processPwData = data => {
    const bad = [];
    const good = [];

    data.forEach(pw => {
      const [rule, password] = pw.split(":").map(x => x.trim());
      const [range, letter] = rule.split(" ");
      const [min, max] = range.split("-").map(x => parseInt(x));

      if(challengeNumber === 1) {
        const pwArray = password.split("");
        const numLetter = pwArray.filter(l => l === letter).length;

        const pwHtml = password.split("").map(p => {
          if (p === letter) {
            return `<span>${p}</span>`;
          } else {
            return p;
          }
        }).join('');

        if (numLetter >= min && numLetter <= max) {
          good.push(`${pwHtml} (${range} ${letter})`);
        } else {
          bad.push(`${pwHtml} (${range} ${letter})`);
        }
      } else {
        const inPos1 = password[min-1] === letter;
        const inPos2 = password[max-1] === letter;

        const pwHtml = password.split("").map((p, ind) => {
          if (ind === min-1 || ind === max-1) {
            return `<span>${p}</span>`;
          } else {
            return p;
          }
        }).join('');

        if ((inPos1 && !inPos2) || (!inPos1 && inPos2)) {
          good.push(`${pwHtml} (${range} ${letter})`);
        } else {
          bad.push(`${pwHtml} (${range} ${letter})`);
        }
      }
    });

    setGoodPws(good);
    setBadPws(bad);
  };

  return (
    <div className="aoc-day--day-2">
      <div className="aoc-day--day-2--password-container aoc-day--tab--section">
        <h2>Good Passwords: {goodPws.length}</h2>
        <div className="aoc-day--day-2--password-list">
          {goodPws.map(password => {
            return (
              <div dangerouslySetInnerHTML={{ __html: password }} />
            );
          })}
        </div>
      </div>
      <div className="aoc-day--day-2--password-container aoc-day--tab--section">
        <h2>Bad Passwords: {badPws.length}</h2>
        <div className="aoc-day--day-2--password-list">
          {badPws.map(password => {
            return (
              <div dangerouslySetInnerHTML={{ __html: password }} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Day2;
