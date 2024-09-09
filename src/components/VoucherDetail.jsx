import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Preloader from "./Preloader";
import { IoHome } from "react-icons/io5";

const VoucherDetail = () => {
  const { voucherId } = useParams();
  const [loading, setLoading] = useState(true);
  const [voucherDetailInfo, setVoucherDetailInfo] = useState([]);
  const currentVoucherData = voucherDetailInfo.find(
    (voucherData) => voucherData.id === voucherId
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/voucher").then((res) =>
          res.json()
        );
        setVoucherDetailInfo(res);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [voucherId]);

  return (
    <>
      <div className=" flex items-center gap-2 px-7">
        <Link
          to="/"
          className="text-gray-700 font-bold flex items-center gap-1"
        >
          <IoHome className="text-gray-700 font-bold" /> Home
        </Link>
        <span>/</span>
        <Link to={"/voucher"} className="text-gray-600 font-semibold">
          Vouchers
        </Link>
        <span>/</span>
        <Link to={"#"} className="text-gray-500 font-semibold">
          VoucherDetail
        </Link>
      </div>
      <div className="px-7 py-5">
        {loading ? (
          <Preloader />
        ) : (
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                Voucher Detail
              </h1>
              <p className="text-lg text-gray-500">K-Acorn Enterprise</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Customer Info
              </h2>
              <p className="text-gray-700">
                <span className="font-medium">Customer Name:</span>{" "}
                {currentVoucherData?.customerName || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Address:</span>{" "}
                {currentVoucherData?.address || "N/A"}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Total Net:</span> $
                {currentVoucherData?.totalNet || "N/A"}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Products Purchased
              </h2>
              {currentVoucherData?.products?.length > 0 ? (
                currentVoucherData.products.map((product) => (
                  <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-4 mb-4"
                  >
                    <p className="text-gray-700">
                      <span className="font-medium">Product Name:</span>{" "}
                      {product.name}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Price:</span> $
                      {product.price}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Quantity:</span>{" "}
                      {product.quantity}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No products found.</p>
              )}
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Thank you for shopping with K-Acorn Enterprise!
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VoucherDetail;
