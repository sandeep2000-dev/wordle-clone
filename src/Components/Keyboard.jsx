import React from "react";
import Key from "./Key";

export default function Keyboard(props) {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <section className="keyboard">
      <div className="row">
        {row1.map((key) => (
          <Key
            key={key}
            handleKeyClicked={props.handleKeyClicked}
            keyStyle={props.handleKeyStyle(key.toLowerCase())}
            char={key}
          />
        ))}
      </div>
      <div className="row" style={{ paddingLeft: "20px" }}>
        {row2.map((key) => (
          <Key
            key={key}
            handleKeyClicked={props.handleKeyClicked}
            keyStyle={props.handleKeyStyle(key.toLowerCase())}
            char={key}
          />
        ))}
      </div>
      <div className="row">
        <button
          onClick={() => props.handleKeyClicked("Enter")}
          className="key"
          style={{ width: "63px" }}
        >
          Enter
        </button>
        {row3.map((key) => (
          <Key
            key={key}
            handleKeyClicked={props.handleKeyClicked}
            keyStyle={props.handleKeyStyle(key.toLowerCase())}
            char={key}
          />
        ))}
        <button
          onClick={() => props.handleKeyClicked("Clear")}
          className="key"
          style={{ width: "63px" }}
        >
          Clear
        </button>
      </div>
    </section>
  );
}
