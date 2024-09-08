import React from "react";
import { FaCoins, FaFileInvoice } from "react-icons/fa";
import { IoBarChartSharp, IoStatsChart } from "react-icons/io5";
import { Link } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center px-7 py-3 h-[350px]">
      <Link
        to="/products"
        className="flex flex-col items-center bg-blue-600 py-14"
      >
        <span>
          <FaCoins className="size-20 text-white" />
        </span>
        <span className="text-white text-lg font-bold">Products</span>
      </Link>
      <Link
        to="/sales"
        className="flex flex-col items-center bg-blue-600 py-14"
      >
        <span>
          <IoBarChartSharp className="size-20 text-white" />
        </span>
        <span className="text-white text-lg font-bold">Sales</span>
      </Link>
      <Link
        to="/voucher"
        className="flex flex-col items-center bg-blue-600 py-14"
      >
        <span>
          <FaFileInvoice className="size-20 text-white" />
        </span>
        <span className="text-white text-lg font-bold">Vouchers</span>
      </Link>
    </div>
  );
};

export default DashBoard;
