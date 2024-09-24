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
      <div className="bg-gray-50 py-4 shadow-md">
        <div className="container mx-auto flex items-center gap-2 px-6">
          <Link to="/" className="text-gray-700 flex items-center gap-1">
            <IoHome className="text-lg" />
            <span className="font-semibold">Home</span>
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/voucher" className="text-gray-700 font-semibold">
            Vouchers
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500 font-semibold">Voucher Detail</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {loading ? (
          <Preloader />
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Voucher Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-6">
              <h1 className="text-4xl font-bold">Voucher Details</h1>
              <p className="mt-2 text-lg">K-Acorn Enterprise</p>
            </div>

            {/* Customer Information */}
            <div className="p-6">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Customer Information
                </h2>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-gray-700">
                    <span className="font-medium">Customer Name: </span>
                    {currentVoucherData?.customerName || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Address: </span>
                    {currentVoucherData?.address || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Total Net: </span>
                    ${currentVoucherData?.totalNet || "N/A"}
                  </p>
                </div>
              </div>

              {/* Products Purchased */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                  Products Purchased
                </h2>
                {currentVoucherData?.products?.length > 0 ? (
                  currentVoucherData.products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
                    >
                      <p className="text-gray-800">
                        <span className="font-semibold">Product Name: </span>
                        {product.name}
                      </p>
                      <p className="text-gray-800">
                        <span className="font-semibold">Price: </span>$
                        {product.price}
                      </p>
                      <p className="text-gray-800">
                        <span className="font-semibold">Quantity: </span>
                        {product.quantity}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No products found.</p>
                )}
              </div>

              {/* Footer */}
              <div className="text-center mt-10 border-t pt-6">
                <p className="text-gray-600">
                  Thank you for shopping with{" "}
                  <span className="font-semibold">K-Acorn Enterprise</span>!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VoucherDetail;
