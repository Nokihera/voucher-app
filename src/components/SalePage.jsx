import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import { FaMinus, FaPlus } from "react-icons/fa";

const SalePage = () => {
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [saleProducts, setSaleProducts] = useState([]);
  const [addSalesProductBtn, setAddSalesProductBtn] = useState(false);
  const [products, setProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [quantities, setQuantities] = useState({}); // Track quantities per product

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
      const res = await fetch("http://localhost:3000/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          address,
          products: selectedProducts,
          totalNet: totalNet
        }),
      });
      const data = await res.json();
      setSaleProducts((prev) => [...prev, data]);
      setAddSalesProductBtn(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <BreadCrumb title={"Sales"} />
      <div className="px-7 mt-7">
        <div className="flex justify-between items-center px-10">
          <input
            type="search"
            className="px-3 py-2 bg-gray-200 border-[1px] border-gray-400 outline-none focus:border-gray-600 rounded-lg"
            placeholder="Search..."
          />
          <button
            className="flex gap-1 bg-green-400 px-3 py-2 rounded-lg text-white items-center"
            onClick={() => setAddSalesProductBtn(true)}
          >
            <FaPlus />
            Add
          </button>
        </div>

        {/* Add Sale Modal */}
        <div
          className={`inset-0 bg-black/30 backdrop-blur-sm rounded-lg w-[700px] px-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 h-[400px] py-6 ${
            addSalesProductBtn ? "absolute" : "hidden"
          }`}
        >
          <h1 className="text-xl text-gray-800 font-bold text-center">
            Add New Sale
          </h1>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="customer-name">Customer Name</label>
              <input
                type="text"
                className="px-3 py-2 bg-gray-200 border-[1px] border-gray-400 outline-none focus:border-gray-600 rounded-lg w-60"
                id="customer-name"
                placeholder="Type Customer Name"
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="customer-address">Customer Address</label>
              <input
                type="text"
                className="px-3 py-2 bg-gray-200 border-[1px] border-gray-400 outline-none focus:border-gray-600 rounded-lg w-60"
                id="customer-address"
                placeholder="Type Customer Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Product Selection */}
          <div className="overflow-y-scroll h-3/5 mt-2">
            <table className="w-full ">
              <thead>
                <tr>
                  <td className="text-left font-semibold">Product Name</td>
                  <td className="text-left font-semibold">Price</td>
                  <td className="text-center font-semibold">Quantity</td>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td className="flex items-center gap-3 justify-center">
                      <button
                        onClick={() => handleQuantityIncrement(product.id)}
                        className="px-3 py-2 bg-gray-200 border-[1px] border-gray-400 outline-none focus:border-gray-600 rounded-lg"
                      >
                        <FaPlus />
                      </button>
                      {quantities[product.id] || 0}
                      <button
                        onClick={() => handleQuantityDecrement(product.id)}
                        className="px-3 py-2 bg-gray-200 border-[1px] border-gray-400 outline-none focus:border-gray-600 rounded-lg"
                      >
                        <FaMinus />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-3">
            <button
              className="bg-blue-500 px-3 py-1 rounded-lg text-white"
              onClick={handleSubmitSale}
            >
              Save
            </button>
            <button
              className="bg-gray-500 px-3 py-1 rounded-lg text-white"
              onClick={() => setAddSalesProductBtn(false)}
            >
              Back
            </button>
          </div>
        </div>

        {/* Sales Table */}
        <div className="w-full px-10 mt-7">
          <table className="w-full">
            <thead>
              <tr>
                <td className="text-left font-bold">#</td>
                <td className="text-left font-bold">Customer Name</td>
                <td className="text-left font-bold">Address</td>
                <td className="text-right font-bold">Total Net</td>
              </tr>
            </thead>
            <tbody>
              {saleProducts.map((sale, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{sale.customerName}</td>
                  <td>{sale.address}</td>
                  <td className="text-right">{sale.totalNet}</td>
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
