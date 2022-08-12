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
        <img src={obj.imageUrl} alt="Sneaker" />
        <div>
          <p>{obj.name}</p>
          <b>{obj.price + " €"}</b>
        </div>
        <img
          className={styles.removeBtn}
          src="img/removeHover.svg"
          alt="Remove"
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
          Cart
          <img
            className={styles.removeBtn}
            src="img/removeHover.svg"
            alt="Remove"
            onClick={onClose}
          />
        </h2>
        {cartHasItems ? (
          <div className={styles.cart}>
            <div className={styles.cart__items}>{renderCartItems()}</div>
            <div className={styles.cart__totalBlock}>
              <ul>
                <li>
                  <span>Total: </span> <div></div> <b>{totalPrice + " €"}</b>
                </li>
                <li>
                  <span>Discount 5%: </span> <div></div>
                  <b>{discount + " €"}</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className={styles.greenButton}
                onClick={onClickOrder}
              >
                <span>Make order</span>
                <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Order is processed!" : "Cart is empty"}
            image={isOrderComplete ? "img/completeOrder.jpg" : "img/empty.png"}
            description={
              isOrderComplete
                ? `Your order #${orderId} will soon be transferred to courier delivery.`
                : "Add at least one pair of sneakers to place an order."
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
