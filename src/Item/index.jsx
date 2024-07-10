import { useEffect, useState } from "react";
import styles from "./index.module.css";
import axios from "axios";

const Item = ({ name, url }) => {
  const [itemData, setItemData] = useState({
    name,
    imageUrl: "",
    order: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url);
      setItemData((prev) => ({
        ...prev,
        imageUrl: response.data.sprites.front_default,
        order: response.data.order,
      }));
    };

    fetchData();
  }, [url]);

  return (
    <div className={styles.pokemon}>
      <img src={itemData.imageUrl} alt={itemData.name} />
      <div className={styles.pokemonTextContainer}>
        <div className={`${styles.pokemonText} ${styles.pokemonTextSpace}`}>
          {itemData.name}
        </div>
        <div className={styles.pokemonText}>
          #{String(itemData.order).padStart(3, "0")}
        </div>
      </div>
      <div>
        <img className={styles.typeSpace} src="/grass.png" alt="grass" />
        <img src="/poison.png" alt="poison" />
      </div>
    </div>
  );
};

export default Item;
