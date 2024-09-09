import React, { useEffect, useState } from "react";
import BreadCrumb from "./BreadCrumb";
import { FaPlus } from "react-icons/fa";
import Preloader from "./Preloader";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [salesProducts, setSalesProducts] = useState([]);
  const [productAddBtn, setProductAddBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");

  const handleProductAddBtnClick = () => {
    setProductAddBtn(true);
  };

  const handleAddProductBtnClick = async () => {
    try {
      const newProduct = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          price: price,
          category: category,
          rating: rating,
        }),
      });
      if (newProduct.ok) {
        setProductAddBtn(false);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const deleteBtnClick = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts(products.filter((product) => product.id !== id));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <BreadCrumb title={"Products"} />
      {loading ? (
        <Preloader />
      ) : (
        <>
          <div className="flex justify-between items-center p-5">
            <input
              type="search"
              className="px-4 py-2 w-1/3 bg-gray-200 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
              placeholder="Search products..."
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors"
              onClick={handleProductAddBtnClick}
            >
              <FaPlus /> Add Product
            </button>
          </div>

          {/* Add Product Modal */}
          {productAddBtn && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center mb-6">
                  Add New Product
                </h1>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                      placeholder="Enter product name"
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Price
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                      placeholder="Enter price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                      placeholder="Enter category"
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Rating
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
                      placeholder="Enter rating"
                      onChange={(e) => setRating(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={handleAddProductBtnClick}
                    >
                      Add Product
                    </button>
                    <button
                      className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                      onClick={() => setProductAddBtn(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Table */}
          <div className="overflow-x-auto p-5">
            <table className="min-w-full bg-white border rounded-md shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    #
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Product Name
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">
                    Category
                  </th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">
                    Rating
                  </th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="p-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="p-4 text-sm text-gray-900 font-semibold">
                      {product.name}
                    </td>
                    <td className="p-4 text-sm text-gray-700">
                      {product.category}
                    </td>
                    <td className="p-4 text-sm text-gray-900 font-semibold text-right">
                      ${product.price}
                    </td>
                    <td className="p-4 text-sm text-gray-700 text-right">
                      {product.rating}
                    </td>
                    <td className="p-4 text-sm text-gray-600 text-right">
                      <button
                        onClick={() => deleteBtnClick(product.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default ProductPage;
