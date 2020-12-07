import React, { useState, useEffect } from "react";
import MaterialTable from 'material-table'

import { tableColumns, getSums, processData } from "./questionHelpers.js";

import "./day6.scss";

const Day6 = () => {
  const [anyoneAnswered, setAnyoneAnswered] = useState(null);
  const [allAnswered, setAllAnswered] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const { any, all } = getSums();

    const data = processData();
    setData(data);

    setAnyoneAnswered(any);
    setAllAnswered(all);
  }, []);

  const getTitle = () => (
    <div className="day6--table--title">
      Customs Questions
    </div>
  )

  return (
    <div className="day6 aoc-day--tab--section">
      <div className="day6--results">
        <h2>Sum of anyone answered: <span>{anyoneAnswered}</span></h2>
        <h2>Sum of all answered: <span>{allAnswered}</span></h2>
      </div>
      {data &&
        <MaterialTable
          title={getTitle()}
          columns={tableColumns}
          data={data}
          options={{
            search: false,
            pageSize: 10,
            fixedColumns: {
              left: 2,
              right: 2,
            }
          }}
        />
      }
    </div>
  );
};

export default Day6;
