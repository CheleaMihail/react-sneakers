import React, { useContext } from "react";
import ContentLoader from "react-content-loader";

import styles from "./Card.module.scss";
import AppContext from "../../context";

function Card({
  id,
  name,
  price,
  imageUrl,
  onPlus,
  onFavorites,
  favorited,
  loading,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const sneaker = { id, parentId: id, name, price, imageUrl };

  const onClickPlus = () => {
    onPlus(sneaker);
  };

  const onClickFavorite = () => {
    onFavorites(sneaker);
    setIsFavorite(!isFavorite);
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={170}
          height={200}
          viewBox="0 0 170 200"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="160" height="90" />
          <rect x="0" y="105" rx="3" ry="3" width="160" height="20" />
          <rect x="0" y="135" rx="3" ry="3" width="95" height="20" />
          <rect x="0" y="172" rx="8" ry="8" width="80" height="25" />
          <rect x="128" y="168" rx="8" ry="8" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorites && (
            <button className={styles.favorite} onClick={onClickFavorite}>
              <img
                src={
                  isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"
                }
                alt="heart"
              />
            </button>
          )}
          <img width={133} height={112} src={imageUrl} alt="aaa" />
          <p>{name}</p>
          <div className={styles.cardBottom}>
            <div>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && (
              <button className={styles.button} onClick={onClickPlus}>
                <img
                  src={isItemAdded(id) ? "img/btn-checked.svg" : "img/plus.svg"}
                  alt="plus"
                />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

Card.defaultProps = {
  favorited: false,
  loading: false,
};

export default Card;
