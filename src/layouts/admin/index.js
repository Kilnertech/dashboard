import { useState, useEffect } from "react";
import { Grid, MenuItem, Select, FormControl, InputLabel, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PromptsManager from "customizedComponents/PromptsManager";
import QueriesManager from "customizedComponents/QueriesManager";
import columnsPromptTable from "data/columnsPromptsTable";
import columnsQueries from "data/columnsQueriesTable";
import { usePromptTable } from 'context'; // Importa il contesto
import { useQueriesTable } from "context"; 

function Admin() {
  const { rowsPromptTable, fetchPrompts } = usePromptTable(); // Usa il contesto per rowsPromptTable
  const { queriesTableRows, fetchQueries } = useQueriesTable(); // Usa il contesto per queriesTableRows

  const [options, setOptions] = useState([]);
  const [selectedKey, setSelectedKey] = useState();
  const [slectedPrompt, setSelectedPrompt] = useState("");

  useEffect(() => {
    fetchPrompts();
  }, [])

  useEffect(() => {
    if (rowsPromptTable.length > 0) {
      const opt = rowsPromptTable.map((value) => ({
        value: value.promptID,
        label: value.prompt,
      }));
      setOptions(opt);
      if (opt.length > 0) {
        setSelectedPrompt(opt[0].value);
        setSelectedKey(opt[0].label);
      }
    }
  }, [rowsPromptTable]);

  // this hook fetches queries each time slectedPrompt is changed
  useEffect(() => {
    if (slectedPrompt !== "") {
      fetchQueries(slectedPrompt);
    }
  }, [slectedPrompt]);

  // Gestione del cambiamento nel menu
  const handleChange = (event) => {
    setSelectedPrompt(event.target.value);
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
            <PromptsManager rows={rowsPromptTable} columns={columnsPromptTable} />
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
                  value={slectedPrompt}
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
            <QueriesManager rows={queriesTableRows} columns={columnsQueries} promptID={slectedPrompt} />
          </Card>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Admin;
