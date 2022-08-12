import { useState } from "react";
import axios from "axios";
import classNames from "classnames";

import styles from "./Drawer.module.scss";
import Info from "../Info";
import { useCart } from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, onRemove, opened }) => {
  const { cartItems, setCartItems, totalPrice, discount } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cartHasItems = cartItems.length > 0;

  const clearBackEndCart = async () => {
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      await axios.delete(
        `https://62c5968b134fa108c256d700.mockapi.io/cart/${item.id}`
      );
      await delay(500);
    }
  };

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://62c5968b134fa108c256d700.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      clearBackEndCart();
    } catch (error) {
      alert("Error order");
    }
    setIsLoading(false);
  };

  const renderCartItems = () => {
    return cartItems.map((obj) => (
      <div key={obj.id} className={styles.cart__item}>
        <img src={obj.imageUrl} alt="ItemImage" />
        <div>
          <p>{obj.name}</p>
          <b>{obj.price + " руб."}</b>
        </div>
        <img
          className={styles.removeBtn}
          src="img/removeHover.svg"
          alt="remove"
          onClick={() => onRemove(obj.id)}
        />
      </div>
    ));
  };

  return (
    <div
      className={classNames(styles.overlay, opened && styles.overlayVisible)}
    >
      <div className={styles.drawer}>
        <h2>
          Корзина
          <img
            className={styles.removeBtn}
            src="img/removeHover.svg"
            alt="remove"
            onClick={onClose}
          />
        </h2>
        {cartHasItems ? (
          <div className={styles.cartWithElements}>
            <div className={styles.cartItems}>{renderCartItems()}</div>
            <div className={styles.cartTotalBlock}>
              <ul>
                <li>
                  <span>Итого: </span> <div></div> <b>{totalPrice + " руб."}</b>
                </li>
                <li>
                  <span>Скидка 5%: </span> <div></div>
                  <b>{discount + " руб."}</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className={styles.greenButton}
                onClick={onClickOrder}
              >
                <span>Оформить заказ</span>
                <img src="img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            image={isOrderComplete ? "img/completeOrder.jpg" : "img/empty.png"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке.`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
          />
        )}
      </div>
    </div>
  );
};

Drawer.defaultProps = {
  items: [],
};

export default Drawer;
