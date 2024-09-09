import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const SalePage = () => {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [saleProducts, setSaleProducts] = useState([]);
  const [addSalesProductBtn, setAddSalesProductBtn] = useState(false);
  const [products, setProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [quantities, setQuantities] = useState({}); // Track quantities per product
  const [searchBox, setSearchBox] = useState(""); // Search input for sales

  // Increment quantity for specific product
  const handleQuantityIncrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: (prevQuantities[productId] || 0) + 1,
    }));
  };

  // Decrement quantity for specific product
  const handleQuantityDecrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max((prevQuantities[productId] || 0) - 1, 0),
    }));
  };

  // Fetch product list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchProducts();
  }, []);

  // Fetch sale product list
  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/sales");
        const data = await res.json();
        setSaleProducts(data);
        setLoading(false);
      } catch (err) {
        alert(err.message);
      }
    };

    fetchSaleProducts();
  }, []);

  // Filter sale products based on search input
  const filteredSaleProducts = saleProducts.filter((sale) =>
    sale.customerName.toLowerCase().includes(searchBox.toLowerCase())
  );

  // Submit sale details
  const handleSubmitSale = async () => {
    const selectedProducts = Object.entries(quantities)
      .filter(([productId, quantity]) => quantity > 0)
      .map(([productId, quantity]) => {
        const product = products.find((p) => p.id === productId);
        return { ...product, quantity };
      });
    const totalNet = selectedProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    try {
      if (customerName.trim() !== "" && address.trim() !== "") {
        const res = await fetch("http://localhost:3000/sales", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerName,
            address,
            products: selectedProducts,
            totalNet: totalNet,
          }),
        });
        const data = await res.json();
        setSaleProducts((prev) => [...prev, data]);
        setAddSalesProductBtn(false);
        if (res.ok) {
          setCustomerName("");
          setAddress("");
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClickCreateVoucher = async (id) => {
    const currentVoucherCreateCustomer = saleProducts.find((product) => product.id === id);
    try {
      const res = await fetch("http://localhost:3000/voucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: currentVoucherCreateCustomer.customerName,
          address: currentVoucherCreateCustomer.address,
          products: currentVoucherCreateCustomer.products,
          totalNet: currentVoucherCreateCustomer.totalNet,
        }),
      });
      if (res.ok) {
        alert("Voucher created successfully");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <BreadCrumb title={"Sales"} />
      <div className="px-7 mt-7">
        <div className="flex justify-between items-center px-10 mb-5">
          <input
            type="search"
            className="px-4 py-2 w-1/3 bg-gray-200 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Search sales..."
            onChange={(e) => setSearchBox(e.target.value)}
          />
          <button
            className="flex gap-1 bg-green-500 px-3 py-2 rounded-lg text-white items-center hover:bg-green-600"
            onClick={() => setAddSalesProductBtn(true)}
          >
            <FaPlus />
            Add Sale
          </button>
        </div>

        {/* Add Sale Modal */}
        <div
          className={`fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center ${
            addSalesProductBtn ? "block" : "hidden"
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg w-[700px] p-6">
            <h1 className="text-2xl text-gray-800 font-bold text-center mb-5">
              Add New Sale
            </h1>
            <div className="flex justify-between mb-5">
              <div className="flex flex-col w-1/2 pr-2">
                <label htmlFor="customer-name" className="font-semibold mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  className="px-3 py-2 bg-gray-200 border-[1px] border-gray-400 outline-none focus:border-gray-600 rounded-lg"
                  id="customer-name"
                  placeholder="Type Customer Name"
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-1/2 pl-2">
                <label htmlFor="customer-address" className="font-semibold mb-1">
                  Customer Address
                </label>
                <input
                  type="text"
                  className="px-3 py-2 bg-gray-200 border-[1px] border-gray-400 outline-none focus:border-gray-600 rounded-lg"
                  id="customer-address"
                  placeholder="Type Customer Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Product Selection */}
            <div className="overflow-y-auto max-h-40 mb-4">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="text-left font-semibold p-2">Product Name</th>
                    <th className="text-left font-semibold p-2">Price</th>
                    <th className="text-center font-semibold p-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">${product.price}</td>
                      <td className="flex items-center gap-3 justify-center p-2">
                        <button
                          onClick={() => handleQuantityIncrement(product.id)}
                          className="px-3 py-2 bg-gray-200 border-[1px] border-gray-400 outline-none focus:border-gray-600 rounded-lg hover:bg-gray-300"
                        >
                          <FaPlus />
                        </button>
                        {quantities[product.id] || 0}
                        <button
                          onClick={() => handleQuantityDecrement(product.id)}
                          className="px-3 py-2 bg-gray-200 border-[1px] border-gray-400 outline-none focus:border-gray-600 rounded-lg hover:bg-gray-300"
                        >
                          <FaMinus />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
                onClick={handleSubmitSale}
              >
                Save Sale
              </button>
              <button
                className="bg-gray-500 px-4 py-2 rounded-lg text-white hover:bg-gray-600"
                onClick={() => setAddSalesProductBtn(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Sales Table */}
        <div className="w-full px-10 mt-7">
          <table className="w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left font-bold p-3">#</th>
                <th className="text-left font-bold p-3">Customer Name</th>
                <th className="text-left font-bold p-3">Address</th>
                <th className="text-right font-bold p-3">Total Net</th>
                <th className="text-right font-bold p-3">Voucher</th>
                <th className="text-right font-bold p-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredSaleProducts.map((sale, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{sale.customerName}</td>
                  <td className="p-3">{sale.address}</td>
                  <td className="text-right p-3">${sale.totalNet}</td>
                  <td className="text-right p-3">
                    <button
                      onClick={() => handleClickCreateVoucher(sale.id)}
                      className="text-blue-500 hover:underline"
                    >
                      Create Voucher
                    </button>
                  </td>
                  <td className="text-right p-3">
                    <Link to={`/sales/${sale.id}`} className="text-blue-500 hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SalePage;
