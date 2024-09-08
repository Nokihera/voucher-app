import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import DashBoard from "../components/DashBoard";
import SalePage from "../components/SalePage";
import ProductPage from "../components/ProductPage";
import NotFound from "../components/NotFound";
import VoucherPage from "../components/VoucherPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/sales",
        element: <SalePage />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      {
        path: "/voucher",
        element: <VoucherPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
