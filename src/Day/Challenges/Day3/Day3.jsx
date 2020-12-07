import React, { useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { map } from "./map.js";

import "./day3.scss";

const slopeOptions = [
  {right: 1, down: 1},
  {right: 3, down: 1},
  {right: 5, down: 1},
  {right: 7, down: 1},
  {right: 1, down: 2},
];

const Day3 = ({ challengeNum }) => {
  const [slopeTable, setSlopeTable] = useState([]);
  const [product, setProduct] = useState(0);

  const [treeRows] = useState(map.split("\n"));
  const [bottom] = useState(treeRows.length - 1);
  const [rowLength] = useState(treeRows[0].length);

  useEffect(() => {
    const tableData = slopeOptions.map(slope => {
      return {
        ...slope,
        trees: findTrees(slope)
      };
    });

    const slopeProduct = tableData.map(x => x.trees).reduce((a,b) => a*b);

    setSlopeTable(tableData);
    setProduct(slopeProduct);
  }, [])

  const findTrees = slope => {
    const { right, down } = slope;

    let currentRow = 0;
    let currentPos = 0;

    let trees = 0;

    while (currentRow + down <= bottom) {
      const checkedSpace = treeRows[currentRow + down][(currentPos + right) % rowLength];
      if (checkedSpace === "#") {
        trees++;
      }

      currentRow = currentRow + down;
      currentPos = currentPos + right;
    }

    return trees;
  }


  return (
    <div className="day3">
      <div className="day3__results aoc-day--tab--section">
        <Table classes={{ 'root' : 'day3__results__table'}}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Slope</TableCell>
              <TableCell align="center">Trees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slopeTable.map((slope, i) => (
              <TableRow key={i}>
                <TableCell align="center">
                  {`Right ${slope.right}, down ${slope.down}`}
                </TableCell>
                <TableCell align="center">{slope.trees}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="day3__results__product">
          <h2>Product of all slopes: <span>{product}</span></h2>
        </div>
      </div>
    </div>
  );
};

export default Day3;
