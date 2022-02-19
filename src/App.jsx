import React, { useState } from "react";
import Board from "./Components/Board";
import Keyboard from "./Components/Keyboard";
import answers from "./data";
import { validWords } from "./data";
import { nanoid } from "nanoid";

function App() {
  const [guessList, setGuessList] = useState([]);
  const [currGuess, setCurrGuess] = useState(0);
  const [wordSize, setWordSize] = useState(5);
  const [guessListSize, setGuessListSize] = useState(6);
  const [answer, setAnswer] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [alertMessages, setAlertMessages] = useState([]);

  React.useEffect(() => {
    const offsetFromDate = new Date(2022, 0, 1);
    const msOffset = Date.now() - offsetFromDate;
    const dayOffset = msOffset / 1000 / 60 / 60 / 24;
    setAnswer(answers[Math.floor(dayOffset)]);
    setCurrGuess(0);
    setGameOver(false);
  }, []);

  React.useEffect(() => {
    const list = [];
    for (let i = 0; i < guessListSize; i++) list.push("");
    setGuessList(list);
  }, [guessListSize]);

  function showAlert(mssg, duration = 1000) {
    const id = nanoid();
    setAlertMessages((prev) => [
      { id: id, message: mssg, hide: false },
      ...prev,
    ]);

    if (duration == null) return;

    setTimeout(() => {
      setAlertMessages((prev) => {
        return prev.map((m) => (m.id === id ? { ...m, hide: true } : m));
      });
    }, duration);
  }

  function handleKeyClicked(char) {
    if (gameOver) return;
    if (char === "Enter") {
      if (guessList[currGuess].length !== wordSize) return;
      if (guessList[currGuess] === answer) {
        showAlert("Win");
        setGameOver("true");
      } else if (
        !(
          validWords.some((word) => word === guessList[currGuess]) ||
          answers.some((word) => word === guessList[currGuess])
        )
      ) {
        showAlert("Not in word list");
        return;
      } else if (currGuess === guessListSize - 1) {
        showAlert(answer.toUpperCase());
        setGameOver(true);
      }
      setCurrGuess((prev) => prev + 1);
      return;
    }
    if (char === "Clear") {
      setGuessList((prevList) =>
        prevList.map((guess, index) =>
          currGuess === index ? guess.slice(0, -1) : guess
        )
      );
      return;
    }
    if (guessList[currGuess].length === wordSize) return;
    setGuessList((prevList) =>
      prevList.map((guess, index) =>
        currGuess === index ? guess + char : guess
      )
    );
  }

  function handleKeyStyle(key) {
    let isGuessed = false;
    let isUsed = false;
    for (let i = 0; i < currGuess; i++) {
      for (let j = 0; j < wordSize; j++) {
        if (guessList[i][j] === key) {
          if (answer[j] === key) {
            isGuessed = true;
            break;
          } else isUsed = true;
        }
      }

      if (isGuessed) break;
    }

    if (isGuessed) {
      return {
        backgroundColor: "#6AAA64",
        color: "white",
      };
    } else if (isUsed) {
      if ([...answer].some((c) => c === key))
        return {
          backgroundColor: "#C9B458",
          color: "white",
        };
      else
        return {
          backgroundColor: "#787C7E",
          color: "white",
        };
    }

    return {};
  }

  function handleCellStyle(wordIndex) {
    if (wordIndex > currGuess) return [];
    if (wordIndex === currGuess) {
      let i = 0;
      let charStyle = [];
      while (i < guessList[wordIndex].length) {
        charStyle.push({
          borderColor: "black",
          borderWidth: "2px",
          borderStyle: "solid",
          fontWeight: "bold",
        });
        i++;
      }

      return charStyle;
    }

    const ans = [...answer];
    const charStyle = [];
    for (let i = 0; i < answer.length; i++) {
      if (guessList[wordIndex][i] === answer[i]) {
        ans[i] = "";
        charStyle.push({
          backgroundColor: "#6AAA64",
          color: "white",
          fontWeight: "bold",
          border: "none",
        });
      } else if (![...ans].some((c) => guessList[wordIndex][i] === c)) {
        charStyle.push({
          backgroundColor: "#787C7E",
          color: "white",
          fontWeight: "bold",
          border: "none",
        });
      } else {
        charStyle.push(-1);
      }
    }

    for (let i = 0; i < charStyle.length; i++) {
      if (charStyle[i] === -1) {
        let j = ans.findIndex((c) => guessList[wordIndex][i] === c);
        if (j != -1) {
          ans[j] = "";
          charStyle[i] = {
            backgroundColor: "#C9B458",
            color: "white",
            fontWeight: "bold",
            border: "none",
          };
        } else {
          charStyle[i] = {
            backgroundColor: "#787C7E",
            color: "white",
            fontWeight: "bold",
            border: "none",
          };
        }
      }
    }

    return charStyle;
  }

  return (
    <>
      <div className="alert-container">
        {alertMessages.map((alert) => (
          <div
            key={alert.id}
            className={alert.hide ? "alert hide" : "alert"}
            onTransitionEnd={() => {
              setAlertMessages((prev) => prev.filter((m) => m.id !== alert.id));
            }}
          >
            {alert.message}
          </div>
        ))}
      </div>
      <header>
        <span className="title">Wordle</span>
      </header>
      <main>
        <Board
          guessList={guessList}
          handleCellStyle={handleCellStyle}
          wordSize={wordSize}
        />
        <Keyboard
          handleKeyClicked={handleKeyClicked}
          handleKeyStyle={handleKeyStyle}
        />
      </main>
    </>
  );
}

export default App;
