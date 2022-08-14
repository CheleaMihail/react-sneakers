import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Audio } from "react-loader-spinner";

import styles from "./Orders.module.scss";
import Card from "../../components/Card";
import Info from "../../components/Info";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const areOrdersEmpty = orders.length < 1;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data } = await axios.get(
          "https://62c5968b134fa108c256d700.mockapi.io/orders"
        );
        setOrders(data);
        setIsLoading(false);
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

  const goBack = () => navigate("/react-sneakers/");

  return (
    <div className={areOrdersEmpty ? styles.containerInfo : styles.container}>
      {isLoading ? (
        <Audio height={100} width={100} color="orange" />
      ) : areOrdersEmpty ? (
        <Info
          parentStyles={styles.info}
          title={"You have no orders"}
          image={"img/info/noOrders.png"}
          description={"You haven't bought anything lately"}
          btnTitle="Back"
          actionClick={goBack}
        />
      ) : (
        <div className={styles.orders}>
          <div className={styles.orders__top}>
            <Link to="/react-sneakers/">
              <img
                src="img/back.svg"
                alt="back"
                style={{ marginRight: "20px" }}
              />
            </Link>
            <h1>My orders</h1>
          </div>
          <div className={styles.orders__list}>
            {orders.map((order) => (
              <div className={styles.order} key={order.id}>
                <h2 className={styles.order__title}>{"Order #" + order.id}</h2>
                <div className={styles.order__list}>
                  {renderOrderList(order)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
