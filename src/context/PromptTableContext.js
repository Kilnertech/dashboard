import React, { createContext, useContext, useState } from "react";
import { callAPI, buildURL, rootAPI } from "api/callAPI";

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