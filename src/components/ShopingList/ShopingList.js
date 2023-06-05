import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
//import { useLocation } from 'react-router-dom';
//import Snackbar from '@mui/material/Snackbar';
//import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedProduct,
  setProductsLoadingState,
  setShoppingListState,
  setShoppingList,
} from "../../redux/productsSlice";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function ShoppingList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loadingStatus = useSelector(
    (state) => state.products.productsLoadingState
  );

  const productsList = useSelector((state) => state.products.list);

  const removeFromShoppingList = async (id) => {
    try {
      dispatch(setShoppingListState("loading"));
      const response = await axios.delete(
        `http://localhost:9000/products/shoppingList${id}`
      );
      dispatch(updateShoppingList(response.data));
    } catch {
      dispatch(setShoppingListState("error"));
    }
  };

  const updateShoppingList = async (id) => {
    try {
      dispatch(setShoppingListState("loading"));
      const response = await axios.get(
        `http://localhost:9000/products/shoppingList${id}`
      );
      dispatch(setShoppingList(response.data));
      dispatch(setShoppingListState("loading"));
    } catch {
      dispatch(setShoppingListState("error"));
    }
  };

  const getShoppingList = (store) => {
    return store.products.shoppingList;
  };

  const getProductsDetails = async (product) => {
    try {
      dispatch(setProductsLoadingState("loading"));
      const response = await axios.get(
        `http://localhost:9000/airports/${product.id}/delayed`
      );
      dispatch(setSelectedProduct(response.data));
      dispatch(setProductsLoadingState("success"));
      navigate(`/product/details/${product.id}`);
    } catch (error) {
      dispatch(setProductsLoadingState("error"));
    }
  };

  const shoppingList = useSelector((store) => getShoppingList(store));

  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <p>Shopping List</p>
        {loadingStatus === "loading" ? (
          <CircularProgress />
        ) : shoppingList ? (
          shoppingList.map((product) => (
            <span
              key={product.id}
              onClick={() => removeFromShoppingList(product.id)}
              onContextMenu={() => getProductsDetails(product.id)}
            >
              {" "}
              {product.id + 1}.{product.name}{" "}
            </span>
          ))
        ) : (
          "brak produktów do wyświetlenia"
        )}
      </header>
    </div>
  );
}

export default ShoppingList;
