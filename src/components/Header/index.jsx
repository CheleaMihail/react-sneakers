import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import { useCart } from "../../hooks/useCart";

const Header = ({ onClickCart }) => {
  const { totalPrice } = useCart();

  return (
    <header>
      <Link to="react-sneakers/">
        <div className={styles.headerLeft}>
          <img src="img/header/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3>REACT SNEAKERS</h3>
            <p>Best sneaker store</p>
          </div>
        </div>
      </Link>
      <ul className={styles.headerRight}>
        <li onClick={onClickCart}>
          <img src="img/header/shop.svg" alt="cart" />
          <span>{totalPrice + " EUR"}</span>
        </li>
        <li>
          <Link to="react-sneakers/favorites">
            <img src="img/header/favorite.svg" alt="favorite" />
          </Link>
        </li>
        <li>
          <Link to="react-sneakers/orders">
            <img src="img/header/user.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
