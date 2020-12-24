import { botCode } from "./botCode";

export const code = botCode.split(/\n/);

export const getAccBeforeLoop = (currInd, currAcc, currVisited, code) => {
  let ind = currInd;
  let inInfiniteLoop = false;
  let acc = currAcc;
  let visited = currVisited;

  while (ind < code.length && !inInfiniteLoop) {
    const instr = code[ind];

    if (visited.includes(ind)) {
      inInfiniteLoop = true;
    }  else {
      visited.push(ind);

      const [operation, arg] = instr.split(" ");

      if (operation === "nop") {
        ind++;
      } else {
        const sign = arg.charAt(0);
        const changeBy = parseInt(arg.substring(1,arg.length));

        if (operation === "jmp") {
          ind = sign === "+" ? ind + changeBy : ind - changeBy;
        } else {
          acc = sign === "+" ? acc + changeBy : acc - changeBy;
          ind++;
        }
      }
    }
  }

  return [acc, ind];
};

export const getFixedAcc = () => {
  let ind = 0;
  let acc = 0;
  let visited = [];
  let foundFix = false;
  let fixedInstr = null;

  while (ind < code.length && !foundFix) {
    const instr = code[ind];

    if (!visited.includes(ind)) {
      visited.push(ind);
    }

    const [operation, arg] = instr.split(" ");
    const sign = arg.charAt(0);
    const changeBy = parseInt(arg.substring(1,arg.length));

    if (operation === "acc") {
      if (sign === "+") {
        acc = acc + changeBy;
      } else {
        acc = acc - changeBy;
      }

      ind++;
    } else {
      const newCode = [...code];
      newCode[ind] = `${operation === 'nop' ? 'jmp' : 'nop'} ${sign}${changeBy}`;

      let newInd, stopInd, stopAcc;

      if (operation === "nop") {
        newInd = sign === "+" ? ind + changeBy : ind - changeBy;
        [stopAcc, stopInd] = getAccBeforeLoop(newInd, acc, visited, newCode);
      } else {
        [stopAcc, stopInd] = getAccBeforeLoop(ind + 1, acc, visited, newCode);
      }

      if (stopInd === code.length) {
        acc = stopAcc;
        ind = stopInd;
        foundFix = true;
        fixedInstr = instr;
      } else {
        ind = operation === 'nop' ? ind + 1 : sign === "+" ? ind + changeBy : ind - changeBy;
      }
    }
  }

  return [acc, fixedInstr];
};
