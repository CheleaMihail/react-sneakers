import React from "react";
import classNames from "classnames";

import GreenButton from "../UI/GreenButton";
import styles from "./Info.module.scss";

const Info = ({
  title,
  image,
  description,
  btnTitle,
  actionClick,
  parentStyles,
}) => {
  return (
    <div className={classNames(styles.container, parentStyles)}>
      <div className={styles.info}>
        <img src={image} alt="emptyCart" />
        <h3 className={styles.info__title}>{title}</h3>
        <p className={styles.info__text}>{description}</p>
        <GreenButton
          parentStyle={styles.greenButton}
          title={btnTitle}
          handleClick={actionClick}
        />
      </div>
    </div>
  );
};

export default Info;
