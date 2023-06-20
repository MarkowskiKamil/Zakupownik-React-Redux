import React from "react";
import commonColumnsStyles from "../../common/styles/Columns.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProductDetails = () => {
  const navigate = useNavigate();

  const matchProduct = useSelector((state) => state.products.selectedProduct);

  return (
    <div className={commonColumnsStyles.App}>
      <header className={commonColumnsStyles.AppHeader}>
        <ArrowBackIcon onClick={() => navigate(-1)} />

        <p>Product Details</p>
        <span>Nazwa: {matchProduct.name}</span>
        <span>id: {matchProduct.id}</span>
      </header>
    </div>
  );
};

export default ProductDetails;
