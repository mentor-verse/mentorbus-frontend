import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./pages/router";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";

import {
  QueryClient,
  QueryCache,
  QueryClientProvider,
} from "@tanstack/react-query";
import { APIResponseError } from "endpoint-client";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import store from "@/store"; // Redux 스토어와 persistor 가져오기
import { persistStore } from "redux-persist";

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

const Persistor = persistStore(store);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
          <BrowserRouter>
            {" "}
            {/* Ensure this matches the base in vite.config.js */}
            <MainRouter />
            <Toaster />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
