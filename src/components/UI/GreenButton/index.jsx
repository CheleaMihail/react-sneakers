import React from "react";
import classNames from "classnames";

import styles from "./GreenButton.module.scss";

const GreenButton = ({ title, handleClick, disabled, parentStyle }) => {
  return (
    <button
      className={classNames(styles.greenButton, parentStyle)}
      disabled={disabled}
      onClick={() => handleClick()}
    >
      <span>{title}</span>
      <img src="img/arrow.svg" alt="Arrow" />
    </button>
  );
};

GreenButton.defaultProps = {
  disabled: false,
};

export default GreenButton;
