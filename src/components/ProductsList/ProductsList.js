import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { setSelectedProduct, setProductsLoadingState } from '../../redux/productsSlice';
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {
  setShoppingListState,
  setShoppingList,
} from "../../redux/productsSlice";
import { uniqueId } from "lodash";

function ProductsList() {
  const [snackbarIsVisible, setSnackbarIsVisible] = useState(false);
  const productsList = useSelector((state) => state.products.list);
  const loadingStatus = useSelector(
    (state) => state.products.productsLoadingState
  );
  const responseError = useSelector((state) => state.products.responseError);
  const dispatch = useDispatch();

  const addToShoppingList = async (product) => {
    try {
      dispatch(setShoppingListState("loading"));
      const requestBody = {
        id: uniqueId(),
        name: product.name,
        category: product.category,
        isFood: product.isFood,
      };
      const response = await axios.post(
        `http://localhost:9000/products/shoppingList/new`,
        requestBody
      );
      const listAfterAddItem = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      console.log(response.data);
      console.log(listAfterAddItem.data);
      dispatch(setShoppingList(listAfterAddItem.data));
      dispatch(setShoppingListState("success"));
    } catch (error) {
      dispatch(setShoppingListState("error"));
      console.log(error);
    }
  };

  return (
    <div className={commonColumnsStyles.AppColumn}>
      <Snackbar
        open={snackbarIsVisible}
        autoHideDuration={3000}
        onClose={() => setSnackbarIsVisible(false)}
        message={`${responseError}`}
      />
      <header className={commonColumnsStyles.AppHeader}>
        <p>Products list</p>
        {loadingStatus === "loading" ? (
          <CircularProgress />
        ) : productsList.length > 0 ? (
          productsList.map((product) => (
            <span onClick={() => addToShoppingList(product)}>
              {" "}
              {product.name} {product.id}{" "}
            </span>
          ))
        ) : (
          "brak produktów do wyświetlenia"
        )}
        {/* Poniżej znajduje się ostylowany aktywny produkt do zadania 5 */}
        {/* <span
          style={{
            backgroundColor: "white",
            border: "1px black solid",
            borderRadius: "16px",
            padding: "6px",
          }}
        >
          Przykładowy aktywny produkt
        </span> */}
      </header>
    </div>
  );
}

export default ProductsList;
