import React, { useState, useEffect } from "react";
import { TextareaAutosize, Tooltip } from "@material-ui/core";
import Button from "../../../Components/Button";

import { processPassports, checkPassports, checkRules, getFields, checkValidity } from "./passportHelpers";
import "./day4.scss";

const Day4 = () => {
  const [passports, setPassports] = useState([]);
  const [valid, setValid] = useState([]);
  const [invalid, setInvalid] = useState([]);
  const [ruleValid, setRuleValid] = useState([]);
  const [ruleInvalid, setRuleInvalid] = useState([]);
  const [inputPp, setInputPp] = useState('');
  const [inputValid, setInputValid] = useState(null);

  useEffect(() => {
    setPassports(processPassports());
  }, []);

  useEffect(() => {
    const { validPs, invalidPs } = checkPassports(passports);

    setValid(validPs);
    setInvalid(invalidPs);
  }, [passports]);

  useEffect(() => {
    const newValid = checkRules(valid);

    setRuleValid(newValid);
    setRuleInvalid(invalid.concat(valid.filter(x => newValid.indexOf(x) === -1)));
  }, [valid]);

  const handleInputPp = event => {
    setInputPp(event.target.value);
  };

  const checkInputPp = () => {
    const passport = getFields(inputPp);
    setInputValid(checkValidity(passport));
  };

  return (
    <div className="day4">
      <div className="day4__results">
        <div className="day4__results__container">
          <h2>Questionable Security</h2>
          <h3>Valid Passports: <span className="valid">{valid.length}</span></h3>
          <h3>Invalid Passports: <span className="invalid">{invalid.length}</span></h3>
        </div>
        <div className="day4__results__container">
          <h2>Strict Validation</h2>
          <h3>Valid Passports: <span className="valid">{ruleValid.length}</span></h3>
          <h3>Invalid Passports: <span className="invalid">{ruleInvalid.length}</span></h3>
        </div>
      </div>
      <div className="day4__checker">
        <div className="day4__checker__section">
          <h3>Check your own passport below!</h3>
          <TextareaAutosize
            placeholder="Enter passport data here (fields separated by new lines or spaces)"
            value={inputPp}
            onChange={handleInputPp}
          />
          <Button onClick={checkInputPp}>
            Check Passport Validity
          </Button>
        </div>
        <div className="day4__checker__section">
          {inputValid && (
            <p>
              <span className={inputValid.valid ? 'valid' : 'invalid'}>{inputValid.valid ? '✓' : 'x'}</span>
              {`${inputValid.valid ? 'Congrats!' :'Uh-oh.'} Your passport is ${inputValid.valid ? '' : 'in'}valid.`}
            </p>
          )}
          {inputValid && inputValid.ruleMap.map(rule => {
            return (
              <Tooltip
                classes={{ tooltip: 'aoc-tooltip' }}
                title={rule.tooltipContent}
                placement="bottom"
              >
                <div>
                  {rule.key}: {rule.data}
                  <span className={rule.ruleValid ? 'valid' : 'invalid'}>{rule.icon}</span>
                </div>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  )
};

export default Day4;
