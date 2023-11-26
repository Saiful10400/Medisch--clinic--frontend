import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Components/Root/RouterProvider.jsx";
import DataProvider from "./Components/Context Api/DataProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient=new QueryClient()
ReactDOM.createRoot(document.getElementById("root")).render(
  <DataProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  </DataProvider>
);
