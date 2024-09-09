import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import DashBoard from "../components/DashBoard";
import SalePage from "../components/SalePage";
import ProductPage from "../components/ProductPage";
import NotFound from "../components/NotFound";
import VoucherPage from "../components/VoucherPage";
import SaleDetail from "../components/SaleDetail";
import VoucherDetail from "../components/VoucherDetail";

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
      {
        path: "/sales/:id",
        element: <SaleDetail/>
      },
      {
        path: "/voucher/:voucherId",
        element: <VoucherDetail/>
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
