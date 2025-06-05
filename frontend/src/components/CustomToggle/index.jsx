import React from "react";
import "./style.css";

const CustomToggle = ({ onChange, checked }) => {
  return (
    <div className="toggleWrapper scale-down">
      <input
        className="input"
        id="dn"
        type="checkbox"
        onChange={onChange}
        value={checked}
      />
      <label className="toggle" htmlFor="dn">
        <span className="toggle__handler">
          <span className="crater crater--1"></span>
          <span className="crater crater--2"></span>
          <span className="crater crater--3"></span>
        </span>
        <span className="star star--1"></span>
        <span className="star star--2"></span>
        <span className="star star--3"></span>
        <span className="star star--4"></span>
        <span className="star star--5"></span>
        <span className="star star--6"></span>
      </label>
    </div>
  );
};

export default CustomToggle;
