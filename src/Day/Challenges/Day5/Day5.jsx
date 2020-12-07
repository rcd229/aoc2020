import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PersonPinIcon from '@material-ui/icons/PersonPin';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import { getPasses, getHighestSeatId, findSeat } from "./boardingPasses";

import "./day5.scss";

const seatLetters = ["A", "B", "C", "D", "E", "F", "G", "H"];

const Day5 = () => {
  const [highestSeatId, setHighestSeatId] = useState(null);
  const [seatIds, setSeatIds] = useState([]);
  const [yourSeat, setYourSeat] = useState(null);
  const [seatRows] = useState(new Array(128).fill(0));
  const [seatCols] = useState(new Array(8).fill(0));

  useEffect(() => {
    const [highestSeat, ids] = getHighestSeatId(getPasses());
    const ys = findSeat(ids.sort((a,b) => a - b), 0);

    setHighestSeatId(highestSeat);
    setSeatIds(ids);
    setYourSeat(ys);
  }, []);

  const getSeatHeader = () => {
    return seatCols.map((col, j) => {
      return (
        <>
          {j === 0 && (
            <Grid
              item
              classes={{ root: 'day5__seats__seat'}}
              xs
              key={'empty'}
            />
          )}
          <Grid
            item
            classes={{ root: 'day5__seats__seat'}}
            key={`header-${j}`}
            xs
          >
            {seatLetters[j]}
          </Grid>
          {j === 3 && (
            <Grid
              item
              classes={{ root: 'day5__seats__aisle'}}
              xs={1}
              key={'aisle0'}
            />
          )}
        </>
      );
    });
  }

  const getLegend = () => {
    return (
      <div className="day5__legend">
        <h2>Seat Legend</h2>
        <div className="day5__legend__item">
          <PersonPinIcon classes={{ root: 'day5__seats__seat-you '}} />
          <p>Your Seat</p>
        </div>
        <div className="day5__legend__item">
          <CloseIcon classes={{ root: 'day5__seats__seat-taken '}} />
          <p>Seat Taken</p>
        </div>
        <div className="day5__legend__item">
          <CheckBoxOutlineBlankIcon classes={{ root: 'day5__seats__seat-empty '}} />
          <p>Epmty Seat</p>
        </div>
      </div>
    )
  }

  return (
    <div className="day5">
      <div className="day5__seats aoc-day--tab--section">
        <Grid container>
          <Grid
            item
            container
            classes={{ root : 'day5__seats__header' }}
          >
            {getSeatHeader()}
          </Grid>
          {seatRows.map((row, i) => (
            <Grid
              item
              container
              classes={{ root: 'day5__seats__row' }}
              key={i}
            >
              {seatCols.map((col, j) => {
                const sId = (i * 8) + j;
                return (
                  <>
                    {j === 0 && (
                      <Grid
                        item
                        classes={{ root: 'day5__seats__seat'}}
                        xs
                        key={'row-${i}'}
                      >
                        {i + 1}
                      </Grid>
                    )}
                    <Grid
                      item
                      classes={{ root: 'day5__seats__seat'}}
                      key={`${i}-${j}`}
                      xs
                    >
                      {sId === yourSeat
                        ? <PersonPinIcon classes={{ root: 'day5__seats__seat-you '}} />
                        : seatIds.includes(sId)
                          ? <CloseIcon classes={{ root: 'day5__seats__seat-taken '}} />
                          : <CheckBoxOutlineBlankIcon classes={{ root: 'day5__seats__seat-empty '}} />
                      }
                    </Grid>
                    {j === 3 && (
                      <Grid
                        item
                        classes={{ root: 'day5__seats__aisle'}}
                        xs={1}
                        key={`aisle-${i+1}`}
                      />
                    )}
                  </>
                )
              })}
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="day5__results aoc-day--tab--section">
        {getLegend()}
        <h2>Highest Seat ID: {highestSeatId}</h2>
        <h2>Your Seat: {Math.floor(yourSeat/8) + 1}{seatLetters[yourSeat % 8]} (ID No. {yourSeat})</h2>
      </div>
    </div>
  );
};

export default Day5;
