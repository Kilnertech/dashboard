import { useState, useEffect } from "react";
import MDTypography from "components/MDTypography";
import { callAPI, buildURL, rootAPI } from "api/callAPI";

// Custom Hook to prepare prompt table data
export function usePreparePromptTable() {
  const [dataRows, setDataRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await callAPI(buildURL(rootAPI, "admin/prompts"), "GET");
        setDataRows(data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataRows([]); // Set dataRows to empty array in case of error
      }
    }

    fetchData(); // Call fetchData directly inside useEffect
  }, []); // Empty dependency array ensures useEffect runs once on mount

  const rowsPromptTable = dataRows.map((item) => ({
    date: item.date,
    prompt: item.prompt,
    promptID: item.id,
  }));

  const columnsPromptTable = [
    {
      Header: "promptid",
      accessor: "promptID",
      align: "left",
      Cell: ({ value }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
          {value}
        </MDTypography>
      ),
    },
    {
      Header: "date",
      accessor: "date",
      align: "left",
      Cell: ({ value }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value}
        </MDTypography>
      ),
    },
    {
      Header: "Prompt",
      accessor: "prompt",
      align: "left",
      Cell: ({ value }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
          {value}
        </MDTypography>
      ),
    },
    // Add more columns as needed
  ];

  return { rowsPromptTable, columnsPromptTable };
}
