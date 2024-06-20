import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./auth";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    return <h1>404 ahhahahaaha</h1>;
  },
});
const queryClient = new QueryClient();

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
      {/* <RouterProvider router={router} context={{ data: "132456" }} /> */}
      {/* <App /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
