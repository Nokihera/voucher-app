import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Preloader from "./Preloader";
import BreadCrumb from "./BreadCrumb";
import { IoHome } from "react-icons/io5";

const SaleDetail = () => {
  const [loading, setLoading] = useState(true);
  const [saleProducts, setSaleProducts] = useState([]);
  const { id } = useParams();
  const currentSaleProduct = saleProducts.find(
    (saleProduct) => saleProduct.id === id
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/sales").then((res) =>
          res.json()
        );
        setSaleProducts(res);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-7 py-3">
      <div className=" flex items-center gap-2 px-7">
      <Link to="/" className="text-gray-700 font-bold flex items-center gap-1">
      <IoHome className="text-gray-700 font-bold" /> Home 
      </Link>
      <span>/</span>
       <Link to={"/sales"} className="text-gray-600 font-semibold">Sales</Link>
       <span>/</span>
       <Link to={"#"} className="text-gray-500 font-semibold">SaleDetail</Link>
    </div>
      {loading ? (
        <Preloader />
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Sale Detail
          </h1>
          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-lg font-medium text-gray-700">
              Customer Name:{" "}
              <span className="text-gray-900">
                {currentSaleProduct?.customerName || "Unknown"}
              </span>
            </h2>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Products Purchased:
            </h3>
            {currentSaleProduct?.products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-300 rounded-lg p-4 mb-4"
              >
                <p className="text-gray-700">
                  <span className="font-medium">Product Name:</span>{" "}
                  {product.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Quantity:</span>{" "}
                  {product.quantity}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Price:</span> ${product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleDetail;
