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

  // Fetch sales products
//   useEffect(() => {
//     const fetchSaleProducts = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/sales");
//         const data = await res.json();
//         setSalesProducts(data);
//       } catch (err) {
//         alert(err.message);
//       }
//     };
//     fetchSaleProducts();
//   }, []);

  // Add or update product in sales
  const addBtnClick = async (id) => {
    const product = products.find((product) => product.id === id);
    const saleProduct = salesProducts.find(
      (saleProduct) => saleProduct.id === id
    );

    try {
      if (saleProduct) {
        // Update quantity if the product already exists in sales
        await fetch(`http://localhost:3000/sales/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: saleProduct.quantity + 1,
          }),
        });
      } else {
        // Add new product to sales with quantity
        await fetch("http://localhost:3000/sales", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...product, quantity: 1 }), // Add initial quantity
        });
      }

      // Re-fetch sales products to update the state
      const updatedSales = await fetch("http://localhost:3000/sales").then(
        (res) => res.json()
      );
      setSalesProducts(updatedSales);
      alert("Product added to sales successfully!");
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

  return (
    <>
      <BreadCrumb title={"Products"} />
      {loading ? (
        <Preloader/>
      ) : (
        <>
          <div className="px-7 flex justify-between mt-7 mx-20">
            <input
              type="search"
              className="px-3 py-2 bg-gray-200 border-[1px] border-gray-400 outline-none focus:border-gray-600 rounded-lg"
              placeholder={`Search...`}
            />
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-1"
              onClick={handleProductAddBtnClick}
            >
              <FaPlus /> Add
            </button>
          </div>
          <div
            className={`inset-0 bg-black/30 backdrop-blur-sm rounded-lg w-[700px] py-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
              productAddBtn ? "absolute" : "hidden"
            } `}
          >
            <h1 className="text-xl font-bold text-center">Add New Product</h1>
            <div className="grid grid-cols-2 place-items-center gap-3">
              <div className="flex flex-col">
                <label
                  htmlFor="product-name"
                  className="select-none text-gray-900 font-bold"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="product-name"
                  className="bg-gray-200 rounded-md outline-none border-2 border-gray-500 focus:border-blue-500 w-full px-3 py-1"
                  placeholder="Type Product Name..."
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="price"
                  className="select-none text-gray-900 font-bold"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="bg-gray-200 rounded-md outline-none border-2 border-gray-500 focus:border-blue-500 w-full px-3 py-1"
                  placeholder="Type Price..."
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="category"
                  className="select-none text-gray-900 font-bold"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="bg-gray-200 rounded-md outline-none border-2 border-gray-500 focus:border-blue-500 w-full px-3 py-1"
                  placeholder="Type Category..."
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="rating"
                  className="select-none text-gray-900 font-bold"
                >
                  Rating
                </label>
                <input
                  type="number"
                  id="rating"
                  className="bg-gray-200 rounded-md outline-none border-2 border-gray-500 focus:border-blue-500 w-full px-3 py-1"
                  placeholder="Type Rating..."
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
              <div className="flex gap-2 ">
                <button
                  className="bg-blue-500 text-white px-3 py-2 rounded-md"
                  onClick={handleAddProductBtnClick}
                >
                  Add
                </button>
                <button
                  className="bg-gray-800 text-white px-3 py-2 rounded-md"
                  onClick={() => setProductAddBtn(false)}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
          <div className="px-7 flex flex-col items-center mx-20 py-4 shadow-lg min-h-[300px]">
            <table className="w-full">
              <thead>
                <tr>
                  <td className="text-left font-bold text-gray-800 text-lg">
                    #
                  </td>
                  <td className="text-left font-bold text-gray-800 text-lg">
                    Product Name
                  </td>
                  <td className="text-left font-bold text-gray-800 text-lg">
                    Categories
                  </td>
                  <td className="text-right font-bold text-gray-800 text-lg">
                    Price
                  </td>
                  <td className="text-right font-bold text-gray-800 text-lg">
                    Rating
                  </td>
                  {/* <td className="text-right font-bold text-gray-800 text-lg">
                    Action
                  </td> */}
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td className="text-left text-gray-600">{index + 1}</td>
                    <td className="text-left text-gray-700 font-semibold">
                      {product.name}
                    </td>
                    <td className="text-left text-gray-600">
                      {product.category}
                    </td>
                    <td className="text-right text-gray-700 font-semibold">
                      ${product.price}
                    </td>
                    <td className="text-right text-gray-600">
                      {product.rating}
                    </td>
                    {/* <td className="text-right">
                      <button
                        className="bg-slate-800 rounded-md px-[3px] py-[3px] text-white"
                        onClick={() => addBtnClick(product.id)}
                      >
                        <span>
                          <FaPlus />
                        </span>
                      </button>
                    </td> */}
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
