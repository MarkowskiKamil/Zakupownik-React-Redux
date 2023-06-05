import Header from "./components/Header/Header";
import ProductsFilters from "./components/ProductsFilters/ProductsFilters";
import styles from "./App.module.scss";
import { Navigate } from "react-router-dom";
// import { Outlet } from "react-router-dom";
import ProductsList from "./components/ProductsList/ProductsList";
import ShoppingList from "./components/ShopingList/ShopingList";

function App(props) {
  const userExist = localStorage.getItem("user");
  if (!userExist) {
    return <Navigate to="/" />;
  }
  return (
    <div className={styles.appWrapper}>
      <Header />
      <ProductsFilters />
      <ProductsList />
      <ShoppingList />
      {/* <Outlet /> */}
    </div>
  );
}

export default App;
