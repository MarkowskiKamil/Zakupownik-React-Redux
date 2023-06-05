import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { setSelectedProduct, setProductsLoadingState } from '../../redux/productsSlice';
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {
  setSelectedProduct,
  setProductsLoadingState,
  setShoppingListState,
  setShoppingList,
} from "../../redux/productsSlice";
import { uniqueId } from "lodash";

function ProductsList() {
  const _ = require("lodash");

  const [snackbarIsVisible, setSnackbarIsVisible] = useState(false);
  const productsList = useSelector((state) => state.products.list);
  const loadingStatus = useSelector(
    (state) => state.products.productsLoadingState
  );
  const responseError = useSelector((state) => state.products.responseError);
  const location = useLocation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addToShoppingList = async (product) => {
    dispatch(setShoppingListState("loading"));
    axios
      .post(`http://localhost:9000/products/shoppingList/new`, {
        id: product.id,
        name: product.name,
        id2: uniqueId(),
      })
      .then(function (response) {
        updateShoppingList();
      })
      .catch(function (error) {
        dispatch(setShoppingListState("error"));
        console.log(error);
      });
  };

  const updateShoppingList = async () => {
    axios
      .get(`http://localhost:9000/products/shoppingList`)
      .then(function (response) {
        dispatch(setShoppingList(response.data));
        dispatch(setShoppingListState("success"));
      })
      .catch(function (error) {
        dispatch(setShoppingListState("error"));
      });
  };

  const productMenu = (id, event) => {
    event.preventDefault();
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
            <span
              onClick={() => addToShoppingList(product)}
              onContextMenu={(event) => productMenu(product.id, event)}
              key={_.uniqueId()}
            >
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
