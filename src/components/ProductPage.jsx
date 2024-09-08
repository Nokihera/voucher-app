import React from "react";
import BreadCrumb from "./BreadCrumb";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  return (
    <div>
      <BreadCrumb title={"Products"} />
    </div>
  );
};

export default ProductPage;
