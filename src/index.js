import React, { useState } from "react";
import ReactDOM from "react-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import "./styles.css";
import { arr } from "./data";

const App = () => {
  const [value, setValue] = useState(0);
  const dirTree = require("directory-tree");
  const filteredTree = dirTree("../public/", { extensions: /\.png/ });
  console.log(filteredTree);
  return (
    <>
      <div className="container">
        <img src={arr[value].image} alt={arr[value].id} />
        <h2>{arr[value].name}</h2>
        <h3>{arr[value].job}</h3>
        <div>
          <button
            type="button"
            onClick={() =>
              value === 0 ? setValue(arr.length - 1) : setValue(value - 1)
            }
          >
            <BsArrowLeft />
          </button>
          <button
            type="button"
            onClick={() =>
              value === arr.length - 1 ? setValue(0) : setValue(value + 1)
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
