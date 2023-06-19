import React from "react";
import styles from "../../common/styles/Headers.module.scss";
import { Link } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loadProducts,
  setProductsLoadingState,
  removeProducts,
  removeProductsFromShoppingList,
  setResponseError,
} from "../../redux/productsSlice";
import axios from "axios";

function Header(props) {
  const currentUser = JSON.parse(window.localStorage.getItem("user"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleButtonClick = () => {
    localStorage.removeItem("loggedUser");
    navigate("/");
  };

  const getProductsFromAPI = async (path) => {
    try {
      dispatch(setProductsLoadingState("loading"));
      const response = await axios.get(`http://localhost:9000/${path}`);
      console.log(response);
      dispatch(loadProducts(response.data));
      dispatch(setProductsLoadingState("success"));
    } catch (error) {
      dispatch(setProductsLoadingState("error"));
    }
  };

  const resetProductsList = async () => {
    try {
      dispatch(setProductsLoadingState("loading"));

      dispatch(removeProducts());
      dispatch(setProductsLoadingState("success"));
    } catch (error) {
      dispatch(setProductsLoadingState("error"));
    }
  }

  const resetShoppingList = async () => {
    try {
      dispatch(setProductsLoadingState("loading"));

      dispatch(removeProducts());
      dispatch(removeProductsFromShoppingList("success"));
    } catch (error) {
      dispatch(setProductsLoadingState("error"));
    }
  }

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.signedUserInfo}>
        <Typography sx={{ m: 2 }} variant="h5">
          Zalogowany:{" "}
          {`${currentUser.userfirstName} ${currentUser.userLastName}`}
        </Typography>
        <Button
          variant="contained"
          onClick={() => getProductsFromAPI("products")}
        >
          Załaduj produkty
        </Button>
        <Button
          variant="contained"
          onClick={() => resetProductsList("products")}
        >
          Wyczyść listę produktów
        </Button>
        <Button
          variant="contained"
          onClick={() => resetShoppingList("products")}
        >
          Wyczyść listę zakupową
        </Button>

        <Link to="/">
          <Button onClick={handleButtonClick} variant="contained" color="error">
            Wyloguj
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
