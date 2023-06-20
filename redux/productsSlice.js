import { createSlice } from "@reduxjs/toolkit";
import { uniqueId } from "lodash";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    shoppingList: [],
    selectedProduct: null,
    productsLoadingState: "initial",
    responseError: "",
    shoppingListState: "initial",
  },
  reducers: {
    loadProducts: (state, value) => {
      state.list = value.payload;
    },
    removeProducts: (state) => {
      state.list = [];
    },
    setSelectedProducts: (state, value) => {
      state.selectedProduct = value.payload;
    },
    removeProduct: (state, value) => {
      const productToRemove = value.payload;
      state.list = state.list.filter(
        (product) => product.id !== productToRemove.id
      );
    },
    removeAllProducts: (state) => {
      state.shoppingListState = [];
    },
    setProductsLoadingState: (state, value) => {
      state.productsLoadingState = value.payload;
    },
    setResponseError: (state, value) => {
      state.responseError = value.payload;
    },
    setShoppingListState: (state, value) => {
      state.shoppingListState = value.payload;
    },
    setShoppingList: (state, value) => {
      state.shoppingList = value.payload;
    },
    setInitialProductsList: (state, value) => {
      state.list = value.payload;
    },
    setFilteredProductsbyFood: (state) => {
      state.list = state.list.filter((product) => product.isFood === true);
    },
    setFilteredProductsbyValue: (state, value) => {
      const searchPhrase = value.payload;
      state.list = state.list.filter((product) =>
        product.name.includes(searchPhrase)
      );
    },
  },
});

export const {
  loadProducts,
  removeProducts,
  setSelectedProduct,
  removeProduct,
  setProductsLoadingState,
  setResponseError,
  setShoppingListState,
  setShoppingList,
  setInitialProductsList,
  setFilteredProductsbyFood,
  setFilteredProductsbyValue,
  removeAllProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
