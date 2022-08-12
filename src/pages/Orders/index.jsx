import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import styles from "./Orders.module.scss";
import Card from "../../components/Card";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await axios.get(
          "https://62c5968b134fa108c256d700.mockapi.io/orders"
        );
        setOrders(data);
      } catch (error) {
        alert("Can not get orders");
      }
    }
    fetchOrders();
  }, []);

  const renderOrderList = (order) => {
    return order.items.map((item, index) => (
      <Card key={item ? item.id : index} {...item} />
    ));
  };

  return (
    <div className="content">
      <div className="content__top" style={{ justifyContent: "flex-start" }}>
        <Link to="/">
          <img src="img/back.svg" alt="back" style={{ marginRight: "20px" }} />
        </Link>
        <h1>My orders</h1>
      </div>
      <div className={styles.orders}>
        {orders.map((order) => (
          <div className={styles.order} key={order.id}>
            <h2 className={styles.order__title}>{"Order #" + order.id}</h2>
            <div className={styles.order__list}>{renderOrderList(order)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
