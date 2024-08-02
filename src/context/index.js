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

/**
 * This file is used for controlling the global states of the components,
 * you can customize the states for the different components here.
 */

import React, { createContext, useContext, useState, useEffect, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import { callAPI, buildURL, rootAPI } from "api/callAPI";

// User Context
const UserContext = createContext();

// User Provider
export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Load data from localStorage as component is mounted
    const storedUserProfile = localStorage.getItem('userProfile');
    if (storedUserProfile) {
      setUserProfile(JSON.parse(storedUserProfile));
    }
  }, []);

  const login = (userData) => {
    setUserProfile(userData);
    // Optionally, you can save the userProfile in localStorage or sessionStorage
    localStorage.setItem("userProfile", JSON.stringify(userData));
  };

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem("userProfile");
  };

  return (
    <UserContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};


const PromptTableContext = createContext();

export const usePromptTable = () => useContext(PromptTableContext);

export const PromptTableProvider = ({ children }) => {
  const [rowsPromptTable, setRowsPromptTable] = useState([]);

  const fetchPrompts = async () => {
    try {
      const data = await callAPI(buildURL(rootAPI, "admin/prompts"), "GET");
      const mappedData = await data.response.map((item) => ({
        date: item.date,
        prompt: item.prompt,
        promptID: item.promptID,
        promptTitle: item.promptTitle
      }));
      setRowsPromptTable(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRowsPromptTable([]); // Set to empty array in case of error
    }
  };

  return (
    <PromptTableContext.Provider value={{ rowsPromptTable, setRowsPromptTable, fetchPrompts }}>
      {children}
    </PromptTableContext.Provider>
  );
};


const QueriesTableContext = createContext();

export const useQueriesTable = () => useContext(QueriesTableContext);

export const QueriesTableProvider = ({ children }) => {
  const [queriesTableRows, setQueriesTableRows] = useState([]);

  const fetchQueries = async (promptID) => {
    try {
      const data = await callAPI(buildURL(rootAPI, `admin/queries?promptID=${promptID}`), "GET");
      const rowsQueries = await data.response.map((item) => ({
        date: item.date,
        query: item.query,
        queryID: item.queryID,
      }));
      setQueriesTableRows(rowsQueries);
      console.log(queriesTableRows);
    } catch (error) {
      console.error("Error fetching data:", error);
      setQueriesTableRows([]); // Set to empty array in case of error
    }
  };

  return (
    <QueriesTableContext.Provider value={{ queriesTableRows, setQueriesTableRows, fetchQueries }}>
      {children}
    </QueriesTableContext.Provider>
  );
};



// PropTypes for UserProvider
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Material Dashboard 2 React main context
const MaterialUI = createContext();

// Setting custom name for the context which is visible on react dev tools
MaterialUI.displayName = "MaterialUIContext";

// Material Dashboard 2 React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV":
      return { ...state, miniSidenav: action.value };
    case "TRANSPARENT_SIDENAV":
      return { ...state, transparentSidenav: action.value };
    case "WHITE_SIDENAV":
      return { ...state, whiteSidenav: action.value };
    case "SIDENAV_COLOR":
      return { ...state, sidenavColor: action.value };
    case "TRANSPARENT_NAVBAR":
      return { ...state, transparentNavbar: action.value };
    case "FIXED_NAVBAR":
      return { ...state, fixedNavbar: action.value };
    case "OPEN_CONFIGURATOR":
      return { ...state, openConfigurator: action.value };
    case "DIRECTION":
      return { ...state, direction: action.value };
    case "LAYOUT":
      return { ...state, layout: action.value };
    case "DARKMODE":
      return { ...state, darkMode: action.value };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Material Dashboard 2 React context provider
function MaterialUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    whiteSidenav: false,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    darkMode: false,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

// Material Dashboard 2 React custom hook for using context
function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setWhiteSidenav = (dispatch, value) => dispatch({ type: "WHITE_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setDarkMode = (dispatch, value) => dispatch({ type: "DARKMODE", value });

export {
  MaterialUIControllerProvider,
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setDarkMode,
};
