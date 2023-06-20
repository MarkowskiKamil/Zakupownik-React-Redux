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
    (state) => state.products.shoppingListState
  );



  const removeFromShoppingList = async (id) => {
    try {
      dispatch(setShoppingListState("loading"));
      const response = await axios.delete(
        `http://localhost:9000/products/shoppingList/${id}`
      );
      console.log(response.data)
      const listAfterRemoveItem = await axios.get(
        `http://localhost:9000/products/shoppingList`
      );
      console.log(listAfterRemoveItem.data)
      dispatch(setShoppingList(listAfterRemoveItem.data));
      dispatch(setShoppingListState("success"));
    } catch (error) {
      dispatch(setShoppingListState("error"));
      console.log("Error", error)
    }
  };


  const getShoppingList = (store) => {
    return store.products.shoppingList;
  };

  const getProductsDetails = async (id) => {
    try {
      dispatch(setProductsLoadingState("loading"));
      const response = await axios.get(`http://localhost:9000/products/shoppingList`);
      const products = response.data;
  
      const selectedProduct = products.find(product => product.id === id);
  
      dispatch(setSelectedProduct(selectedProduct));
      dispatch(setProductsLoadingState("success"));
      navigate(`/products/details/${id}`);
    } catch (error) {
      dispatch(setProductsLoadingState("error"));
      console.log("Error", error);
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
              {product.id2}.{product.name}{" "}
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
