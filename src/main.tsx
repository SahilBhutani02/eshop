import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./pages/App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./reduxStore/store.tsx";
import { PersistGate } from "redux-persist/integration/react";
import "./assets/css/tailwind.css";
import "./assets/css/style.css";
import "./assets/css/custom.css";
import { SidebarProvider } from "./components/context/SidebarContext.tsx";
import { ThemeProvider } from "./components/context/ThemeContext.tsx";
import { FilterProvider } from "./components/context/FilterContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SidebarProvider>
            <ThemeProvider>
              <FilterProvider>
                <App />
              </FilterProvider>
            </ThemeProvider>
          </SidebarProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
