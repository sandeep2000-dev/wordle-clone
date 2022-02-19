import React from "react";

export default function Key(props) {
  return (
    <button
      onClick={() => props.handleKeyClicked(props.char.toLowerCase())}
      style={props.keyStyle}
      className="key"
    >
      {props.char}
    </button>
  );
}
