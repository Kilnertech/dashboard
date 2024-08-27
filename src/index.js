/**
 * =========================================================
 * Material Dashboard 2 React - v2.2.0
 * =========================================================
 *
 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)
 *
 * Coded by www.creative-tim.com
 *
 * =========================================================
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Providers
import { MaterialUIControllerProvider} from "context";
import { UserProvider } from "context/UserContext";
import {PromptTableProvider} from "context/PromptTableContext";
import {QueriesTableProvider} from "context/QueriesTableContext"

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <UserProvider>
      <PromptTableProvider>
        <QueriesTableProvider>
          <MaterialUIControllerProvider>
            <App />
          </MaterialUIControllerProvider>
          </QueriesTableProvider>
      </PromptTableProvider>
    </UserProvider>
  </BrowserRouter>
);
