import React from "react";

export default function Word(props) {
  const charArray = [];
  for (let i = 0; i < props.wordSize; i++) {
    charArray.push(
      <div
        className="cell"
        style={props.charStyle.length > i ? props.charStyle[i] : {}}
        key={i}
      >
        {props.word.length > i && props.word[i].toUpperCase()}
      </div>
    );
  }

  return <div className="row">{charArray}</div>;
}
