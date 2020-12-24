import { equations } from "./equations";

export const processEquation = (equation, advanced) => {
  let parens = equation.match(/\(\d[^\)\(]*\d\)/g);

  while (parens) {
    const group = parens[0]
    const g = group.replace(/[\(\)]/g, '');

    const inner = advanced ? solveAdvanced(g) : solve(g);

    equation = equation.replace(group, inner);

    parens = equation.match(/\(\d[^\)\(]*\d\)/g);
  };

  return advanced ? solveAdvanced(equation) : solve(equation);
};

const solve = equation => {
  const eq = equation.split(' ');
  let answer = parseInt(eq[0]);
  let ind = 1;

  while (ind < eq.length) {
    if (eq[ind] === '+') {
      answer = answer + parseInt(eq[ind+1]);
    } else {
      answer = answer * parseInt(eq[ind+1]);
    }
    ind = ind + 2;
  }
  
  return answer;
};

const solveAdvanced = equation => {
  let eq = equation.replace(/\s/g, '');
  let firstNum;
  let secondNum;

  while (eq.match(/[+\*]/g)) {
    const plusInd = eq.indexOf('+');

    if (plusInd !== -1) {
      [firstNum] = eq.substring(0, plusInd).match(/\d+$/g);
      [secondNum] = eq.substring(plusInd+1, eq.length).match(/^\d+/g);

      const sum = parseInt(firstNum) + parseInt(secondNum);

      eq = eq.replace(eq.substring(plusInd - firstNum.length, plusInd + 1 + secondNum.length), sum);
    } else {
      const multiInd = eq.indexOf('*');

      [firstNum] = eq.substring(0, multiInd).match(/\d+$/);
      [secondNum] = eq.substring(multiInd+1, eq.length).match(/^\d+/);

      const multi = parseInt(firstNum) * parseInt(secondNum);

      eq = eq.replace(eq.substring(multiInd - firstNum.length ,multiInd + 1 + secondNum.length), multi);
    }
  }

  return parseInt(eq);
}

export const solveEquations = (advanced, eqs=equations) => {
  return eqs.split(/\n/).reduce((a, equation) => {
    return a + processEquation(equation, advanced)
  }, 0);
}
