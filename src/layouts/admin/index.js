import { useState, useEffect, useMemo } from "react";
import { Grid, MenuItem, Select, FormControl, InputLabel, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PromptsHandler from "customizedComponents/promptsHandler";
import QueriesHandler from "customizedComponents/queriesHandler";
import { callAPI, buildURL, rootAPI } from "api/callAPI";
import columnsPromptTable from "data/columnsPromptsTable";
import columnsQueries from "data/columnsQueriesTable";

function PromptsManager() {

  const [rowsPromptTable, setRowsPromptTable] = useState([]);
  const [options,setOptions] = useState([]);
  const [queriesTableRows, setQueriesTableRows] = useState([]);
  const [selectedKey, setSelectedKey] = useState();
  const [selectedValue, setSelectedValue] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await callAPI(buildURL(rootAPI, "admin/prompts"), "GET");
        const mappedData = data.response.map((item) => ({
          date: item.date,
          prompt: item.prompt,
          promptID: item.id,
        }));
        setRowsPromptTable(mappedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setRowsPromptTable([]); // Set to empty array in case of error
      }
    }

    fetchData(); // Call fetchData once on mount
  }, []);


  useEffect(() => {
    console.log(rowsPromptTable);
    console.log("ciao - setting default values");
    if (rowsPromptTable.length > 0) {
      const opt = rowsPromptTable.map((value) => ({
        value: value.promptID,
        label: value.prompt,
      }));
      setOptions(opt);
      if (opt.length > 0) {
        setSelectedValue(opt[0].value);
        setSelectedKey(opt[0].label);
      }
    }
  }, [rowsPromptTable]);

  const handle = (c) => {
    console.log(c);
  };

  // Effetto per eseguire la chiamata API quando cambia selectedValue
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await callAPI(buildURL(rootAPI, `admin/queries?promptID=${selectedValue}`), "GET");
        const rowsQueries = data.response.map((item) => ({
          date: item.date,
          query: item.query,
          queryID: item.queryID,
        }));
        setQueriesTableRows(rowsQueries);
        console.log(rowsQueries);
      } catch (error) {
        console.error("Error fetching data:", error);
        setQueriesTableRows([]); // Setta queriesTableRows a lista vuota in caso di errore
      }
    }

    if (selectedValue !== "") {
      fetchData();
    }
  }, [selectedValue]);

  // Gestione del cambiamento nel menu
  const handleChange = (event) => {
    console.log(event.target.value);
    setSelectedValue(event.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid item xs={20} md={4} pb={20}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Prompts Manager
              </MDTypography>
            </MDBox>
            <PromptsHandler rows={rowsPromptTable} columns={columnsPromptTable} handle={handle} />
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Queries Manager
              </MDTypography>
            </MDBox>
            <MDBox pt={6} px={5} pb={8}>
              <FormControl fullWidth>
                <InputLabel id="dropdown-label">Select Prompt</InputLabel>
                <Select
                  labelId="dropdown-label"
                  value={selectedValue}
                  key={selectedKey}
                  onChange={handleChange}
                  multiline
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 600, // Altezza massima del menu
                        maxWidth: 500,
                      },
                    },
                  }}
                  style={{ minHeight: 40 }} // Altezza minima del select
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </MDBox>
            <QueriesHandler rows={queriesTableRows} columns={columnsQueries} handle={handle} />
          </Card>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PromptsManager;
