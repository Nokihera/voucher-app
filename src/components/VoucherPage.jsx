import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import { Link } from "react-router-dom";
import Preloader from "./Preloader";

const VoucherPage = () => {
  const [loading, setLoading] = useState(true);
  const [voucherCustomerList, setVoucherCustomerList] = useState([]);
  const [allVoucherList, setAllVoucherList] = useState([]);
  const [searchBox, setSearchBox] = useState("");
  useEffect(() => {
    const filterData = () => {
      try {
        if (searchBox.trim() === "") {
          setVoucherCustomerList(allVoucherList);
        } else {
          const filteredList = allVoucherList.filter((voucher) =>
            voucher?.customerName.toLowerCase().includes(searchBox.toLowerCase())
          );
          setVoucherCustomerList(filteredList);
        }
      } catch (err) {
        alert(err.message);
      }
    };
    
    filterData();
  }, [searchBox, allVoucherList]); // Include allVoucherList as a dependency
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/voucher").then((res) =>
          res.json()
        );
        setVoucherCustomerList(res);
        setAllVoucherList(res);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <BreadCrumb title={"Vouchers"} />
      <div className="px-7 py-5">
        <input
          onChange={(e) => setSearchBox(e.target.value)}
          type="search"
          className="px-4 py-2 mb-5 w-1/3 bg-gray-200 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
          placeholder="Search vouchers..."
        />
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 text-left">
                <th className="px-6 py-3 text-sm font-semibold uppercase">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold uppercase">
                  Address
                </th>
                <th className="px-6 py-3 text-sm font-semibold uppercase text-right">
                  Total Net
                </th>
                <th className="px-6 py-3 text-sm font-semibold uppercase text-center">
                  Voucher
                </th>
              </tr>
            </thead>
            <tbody>
              {voucherCustomerList.map((voucherList) => (
                <tr
                  key={voucherList.id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="px-6 py-4">{voucherList.customerName}</td>
                  <td className="px-6 py-4">{voucherList.address}</td>
                  <td className="px-6 py-4 text-right">
                    {voucherList.totalNet}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/voucher/${voucherList.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Voucher
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && <Preloader />}
      </div>
    </>
  );
};

export default VoucherPage;
