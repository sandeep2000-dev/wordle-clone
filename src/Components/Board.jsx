import React from "react";
import Word from "./Word";

export default function Board(props) {
  return (
    <section className="board">
      {props.guessList.map((word, index) => (
        <Word
          key={index}
          wordIndex={index}
          charStyle={props.handleCellStyle(index)}
          word={word}
          wordSize={props.wordSize}
        />
      ))}
    </section>
  );
}
