import { useEffect, useState, React } from "react";
import styles from "../../common/styles/Headers.module.scss";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  setSelectedProduct,
  setProductsLoadingState,
  setInitialProductsList,
  setShoppingListState,
  setShoppingList,
  setFilteredProductsbyValue,
} from "../../redux/productsSlice";

function ProductsFilters() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [isFoodCategory, setIsFoodCategory] = useState(false);

  const initialProducts = async () => {
    const response = await axios.get(`http://localhost:9000/products`);
    dispatch(setInitialProductsList(response.data));
  };
  const filteredByValue = () => {
    dispatch(setFilteredProductsbyValue(searchValue));
  };
  const filteredByFood = () => {
    dispatch(setFilteredProductsbyValue(isFoodCategory));
  };
  const setInitialValues = async () => {
    try {
      dispatch(setShoppingListState("loading"));
      dispatch(setShoppingListState("initial"));
      const response = await axios.get(`http://localhost:9000/products`);
      dispatch(setInitialProductsList(response.data));
      dispatch(setProductsLoadingState("success"));
      dispatch(setInitialProductsList(response.data));
      setInitialValuesShoppingList();
      document.getElementById("loader").id = "normalBtn";
    } catch (e) {
      dispatch(setShoppingListState("error"));
      console.log("ERROR", e);
    }
  };
  const setInitialValuesShoppingList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/products/shopingList`
      );

      dispatch(setShoppingList(response.data));
      dispatch(setShoppingListState("success"));
    } catch (e) {
      dispatch(setShoppingListState("error"));
      console.log("ERROR", e);
    }
  };
  useEffect(() => {
    initialProducts();
    filteredByValue();
    if (isFoodCategory) {
      filteredByFood();
    }
  }, [searchValue]);
  useEffect(() => {
    if (isFoodCategory) {
      filteredByFood();
    } else {
      initialProducts();
      if (searchValue) {
        filteredByValue();
      }
    }
  }, [isFoodCategory]);
  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };
  const onChangeIsFoodCategory = () => {
    setIsFoodCategory(!isFoodCategory);
  };

  return (
    <>
      <div className={styles.FiltersHeaderWrapper}>
        <div className={styles.buttons}>
          <Button
            id="loader"
            className={styles.buttons}
            onClick={setInitialValues}
          >
            Load products
          </Button>
        </div>
        <div>
          <FormGroup className={styles.filtersForm}>
            <FormControlLabel
              className={styles.filtersForm}
              control={
                <TextField
                  className={styles.Inputs}
                  id="productFilter"
                  margin="auto"
                  label="product name"
                  variant="outlined"
                  value={searchValue}
                  onChange={onChangeSearchValue}
                />
              }
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className={styles.filtersForm}>
            <label>
              Only food:
              <FormControlLabel
                control={
                  <Checkbox
                    type="checkbox"
                    id="checkbox"
                    display="grid"
                    value={isFoodCategory}
                    onChange={onChangeIsFoodCategory}
                  />
                }
              />
            </label>
          </FormGroup>
        </div>
      </div>
    </>
  );
}

export default ProductsFilters;
