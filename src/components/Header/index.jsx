import { Link } from "react-router-dom";

import styles from "./Header.module.scss";
import { useCart } from "../../hooks/useCart";

const Header = ({ onClickCart }) => {
  const { totalPrice } = useCart();

  return (
    <header>
      <Link to="/">
        <div className={styles.headerLeft}>
          <img src="img/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3>REACT SNEAKERS</h3>
            <p>Best sneaker store</p>
          </div>
        </div>
      </Link>
      <ul className={styles.headerRight}>
        <li onClick={onClickCart}>
          <img src="img/shop.svg" alt="cart" />
          <span>{totalPrice + " EUR"}</span>
        </li>
        <li>
          <Link to="/favorites">
            <img src="img/favorite.svg" alt="favorite" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img src="img/user.svg" alt="user" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
