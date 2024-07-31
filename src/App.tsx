import { HashRouter } from "react-router-dom";
import { MainRouter } from "./pages/router";
import { Toaster } from "./components/ui/sonner";
import { RecoilRoot } from "recoil";
import {
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from "@tanstack/react-query";
import { APIResponseError } from "endpoint-client";
import "./App.css";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof APIResponseError) {
        if (error.body.code === "invalid_token") {
          localStorage.removeItem("token");
          window.location.href = "/";
        }
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <HashRouter>  {/* Ensure this matches the base in vite.config.js */}
          <MainRouter />
          <Toaster />
        </Hash>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
