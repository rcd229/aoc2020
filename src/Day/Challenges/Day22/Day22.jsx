import React, { useState, useEffect, useRef } from "react";
import Button from "../../../Components/Button";

import { player1, player2, draw } from "./Day22.utils";
import meImage from "./me.jpg";
import crabImage from "./crab.png";

import "./Day22.scss";

const Day22 = () => {
  const [table, setTable] = useState(null);
  const [myDeck, setMyDeck] = useState(player1);
  const [crabDeck, setCrabDeck] = useState(player2);
  const [winner, setWinner] = useState('Draw a card');
  const [winningDeck, setWinningDeck] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [recursiveRunning, setRecursiveRunning] = useState(false);
  const [delay, setDelay] = useState(10);
  const [rounds, setRounds] = useState([]);

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const drawCard = (isRecursive, rnds, deck1, deck2) => {
    const mDeck = isRecursive ? [...deck1] : [...myDeck];
    const cDeck = isRecursive ? [...deck2] : [...crabDeck];
    let rounds = [...rnds];

    if (isRecursive) {
      const repeat = rounds.find(round =>
        round.me === JSON.stringify(mDeck) &&
        round.crab === JSON.stringify(cDeck)
      );

      if (repeat) {
        return 'me';
      } else {
        rounds = rounds.concat([{
          me: JSON.stringify(mDeck),
          crab: JSON.stringify(cDeck)
        }]);
      }
    }

    if (mDeck.length && cDeck.length) {
      const [me] = mDeck.splice(0,1);
      const [crab] = cDeck.splice(0,1);

      const newMe = me > crab ? mDeck.concat([me, crab]) : mDeck;
      const newCrab = crab > me ? cDeck.concat([crab, me]) : cDeck;

      if (!isRecursive) {
        setTable([me, crab]);
        setWinner(me > crab ? 'You win!' : 'Cleavage Crab wins!');
        setMyDeck(newMe);
        setCrabDeck(newCrab);

        if (!newMe.length) {
          setWinningDeck(newCrab);
        }

        if (!newCrab.length) {
          setWinningDeck(newMe);
        }
      } else {
        if (!newMe.length) { return 'crab'; }
        else if (!newCrab.length) { return 'me'; }
        else { return drawCard(isRecursive, rounds, newMe, newCrab); }
      }
    }
  }

  const _drawRecursive = (rnds, deck1, deck2) => {
    let mDeck = [...deck1];
    let cDeck = [...deck2];
    let winner;
    console.log('new round');

    const repeat = rnds.find(round =>
      round.me === JSON.stringify(deck1) &&
      round.crab === JSON.stringify(deck2)
    );

    const [me] = mDeck.splice(0,1);
    const [crab] = cDeck.splice(0,1);

    if (repeat) {
      winner = me;
    } else {
      rnds = rnds.concat([{
        me: JSON.stringify(deck1),
        crab: JSON.stringify(deck2)
      }]);

      if (mDeck.length < me || cDeck.length < crab) {
        if (me > crab) {
          winner = 'me';
        } else {
          winner = 'crab';
        }
      } else {
        const newd1 = mDeck.slice(0,me);
        const newd2 = cDeck.slice(0,crab);

        winner = drawRecursive([], newd1, newd2);
      }
    }

    const newMe = winner === 'me' ? mDeck.concat([me, crab]) : mDeck;
    const newCrab = winner === 'crab' ? cDeck.concat([crab, me]) : cDeck;

    if (!newMe.length || !newCrab.length) {
      if (!newMe.length) {
        console.log('crab', getSolution(newCrab));
      } else {
        console.log('me', getSolution(newMe));
      }

      return winner;
    } else {
      return () => _drawRecursive(rnds, newMe, newCrab);
    }
  }

  const trampoline = fn => (...args) => {
  let res = fn(...args);
  while (typeof res === 'function') { res = res(); }
  return res;
}

  const drawRecursive = trampoline(_drawRecursive);

  const getSolution = deck => {
    const sum = deck.reduce((a, b, ind) => {
      return a + (b * (deck.length - ind));
    }, 0);

    return sum;
  };

  useInterval(() => {
    if (myDeck.length && crabDeck.length) {
      drawCard(false);
    } else {
      setIsRunning(false);
    }
  }, isRunning ? delay : null);

  useInterval(() => {
    if (myDeck.length && crabDeck.length) {
      drawRecursive();
    } else {
      setRecursiveRunning(false);
    }
  }, recursiveRunning ? delay : null);

  return (
    <div className="day22">
      <div className="day22__war">
        <div className="day22__war__deck">
          <div className="card card-green">
            <img src={meImage} />
          </div>
          <p>Cards left: {myDeck.length}</p>
        </div>
        <div className="day22__war__table">
          <div className="day22__war__table__cards">
            <div className="card card-green card-face">
              {(myDeck.length && table) ? (
                <>
                  <img src={meImage} />
                  {table[0]}
                  <img src={meImage} />
                </>
              ) : null}
              {!myDeck.length && (
                <>
                  Wow, you lost to Cleavage Crab. RIP...
                </>
              )}
            </div>
            <div className="card card-red card-face">
              {crabDeck.length && table ? (
                <>
                  <img src={crabImage} />
                  {table[1]}
                  <img src={crabImage} />
                </>
              ) : null}
              {!crabDeck.length && (
                <>
                  Congrats, you beat the Cleavage Crab!!!
                </>
              )}
            </div>
          </div>
          <p>{winner}</p>
          <Button onClick={() => drawCard(false)}>
            Draw
          </Button>
        </div>
        <div className="day22__war__deck">
          <div className="card card-red">
            <img src={crabImage} />
          </div>
          <p>Cards left: {crabDeck.length}</p>
        </div>
      </div>
      <Button onClick={() => setIsRunning(true)}>
        Solve
      </Button>
      {winningDeck ? (
        <p>Solution: {() => getSolution(myDeck)}</p>
      ): null}
      {/* <Button onClick={() => setRecursiveRunning(true)}> */}
      <Button onClick={() => drawRecursive([], myDeck, crabDeck)}>
        Solve Recursive
      </Button>
    </div>
  )
};

export default Day22;
