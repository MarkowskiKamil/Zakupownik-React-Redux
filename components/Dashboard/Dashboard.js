import ProductsList from "../ProductsList/ProductsList";
import shoppingList from "../shoppingList/shoppingList";
import styles from "../../App.module.scss";

function Dashboard() {
  return (
    <div className={styles.columnsWrapper}>
      <ProductsList />
      <shoppingList />
    </div>
  );
}

export default Dashboard;
