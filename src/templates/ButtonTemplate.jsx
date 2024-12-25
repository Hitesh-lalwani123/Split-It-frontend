import React, { useState } from "react";
const PrimaryButtonTemplate = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  const btnType = "white";
  return (
    <div
      className={`bg-violet-500 text-white rounded-md font-semibold py-1 px-2 shadow-black inline-block backdrop-blur-md hover:bg-violet-400 ${
        clicked ? "" : "shadow-sm shadow-black"
      }`}
      onMouseDown={() => {
        setClicked(true);
      }}
      onMouseUp={() => {
        setClicked(false);
      }}
    >
      {children}
    </div>
  );
};
const SecondaryButtonTemplate = ({ children }) => {
  const [clicked, setClicked] = useState(false);
  const btnType = "violet";
  return (
    <span
      className={`bg-violet-200 rounded-md font-semibold py-1 px-2 shadow-black border-1 inline-block border-black hover:bg-violet-100 ${
        clicked ? "" : "shadow-sm shadow-black"
      }`}
      onMouseDown={() => {
        setClicked(true);
      }}
      onMouseUp={() => {
        setClicked(false);
      }}
    >
      {children}
    </span>
  );
};

export { PrimaryButtonTemplate, SecondaryButtonTemplate };
