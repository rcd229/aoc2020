import Day1 from "./Day1";
import Day2 from "./Day2";
import Day3 from "./Day3";
import Day4 from "./Day4";
import Day5 from "./Day5";

export const challengeList = {
  1: {
    challenge1: <Day1 challengeNumber={1} />,
    challenge2: <Day1 challengeNumber={2} />
  },
  2: {
    challenge1: <Day2 challengeNumber={1} />,
    challenge2: <Day2 challengeNumber={2} />
  },
  3: {
    challenge1: <Day3 challengeNumber={1} />,
    challenge2: <Day3 challengeNumber={2} />
  },
  4: {
    challenge1: <Day4 challengeNumber={1} />,
    challenge2: <Day4 challengeNumber={2} />
  },
  5: {
    challenge1: <Day5 challengeNumber={1} />,
    challenge2: <Day5 challengeNumber={2} />
  },
};
