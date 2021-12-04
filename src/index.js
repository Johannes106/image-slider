import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import "./styles.css";

const App = () => {
  const jsonFile = require("./sma_graphics.json");

  const [value, setValue] = useState(0);
  return (
    <>
      <div className="container">
        <img src={jsonFile[value].path} alt={jsonFile[value].id} />
        <h2>{jsonFile[value].name}</h2>
        <h3>{jsonFile[value].datum}</h3>
        <div>
          <button
            type="button"
            onClick={() =>
              value === 0 ? setValue(jsonFile.length - 1) : setValue(value - 1)
            }
          >
            <BsArrowLeft />
          </button>
          <button
            type="button"
            onClick={() =>
              value === jsonFile.length - 1 ? setValue(0) : setValue(value + 1)
            }
          >
            <BsArrowRightShort />
          </button>
        </div>
      </div>
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
