import { xmas as xmasString } from "./xmas";

const xmas = xmasString.split(/\n/).map(x => parseInt(x));

export const decipherXmas = () => {
  let invalid = null;
  let ind = 25;

  while (ind < xmas.length && !invalid) {
    const newNum = xmas[ind];
    const pream = xmas.slice(ind - 25, ind).sort((a,b) => a - b);

    if (newNum < pream[0] + pream[1] || newNum > pream[pream.length - 1] + pream[pream.length - 2]) {
      invalid = newNum;
    } else {
      if (!findTwo(pream, newNum)) {
        invalid = newNum;
      }
    }

    ind++;
  }

  return invalid;
};

export const getSlidingTotal = () => {
  let add = xmas.reduce((a,b) => {
    
  }, [])
};

const findTwo = (preamble, total) => {
  let pair = null;
  let ind = 0;

  while (!pair && ind < preamble.length) {
    const firstNum = preamble[ind];
    const secondNum = preamble.slice(ind+1 , preamble.length).find(y => firstNum + y === total);
    if (secondNum) {
      pair = [firstNum, secondNum];
    } else {
      ind++;
    }
  }

  return pair;
}
