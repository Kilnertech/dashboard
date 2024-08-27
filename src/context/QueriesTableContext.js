import React, { createContext, useContext, useState} from "react";
import { callAPI, buildURL, rootAPI } from "api/callAPI";

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