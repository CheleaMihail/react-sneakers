import React, { useContext } from "react";

import AppContext from "../../context";
import styles from "./Info.module.scss";

const Info = ({ title, image, description }) => {
  const { setCartOpened } = useContext(AppContext);
  return (
    <div className={styles.emptyCartContainer}>
      <div className={styles.emptyCart}>
        <img src={image} alt="emptyCart" />
        <h3 className={styles.emptyCart__title}>{title}</h3>
        <p className={styles.emptyCart__text}>{description}</p>
        <button
          className={styles.greenButton}
          onClick={() => setCartOpened(false)}
        >
          <span>Вернуться назад</span>
          <img src="img/arrow.svg" alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Info;
