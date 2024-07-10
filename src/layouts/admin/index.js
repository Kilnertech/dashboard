import { useState, useEffect } from "react";
import { Grid, MenuItem, Select, FormControl, InputLabel, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import PromptsHandler from "customizedComponents/promptsHandler";
import { callAPI, buildURL, rootAPI } from "api/callAPI";
import { func } from "prop-types";
import { usePreparePromptTable } from "data/promptList";

function PromptsManager() {

  const [options, setOptions] = useState([]);
  

  const { rowsPromptTable, columnsPromptTable } = usePreparePromptTable();


  // Effetto per inizializzare le opzioni del menu
  useEffect(() => {
    async function initializeOptions() {


      const options = rowsPromptTable.map((value) => ({
        value: value.promptID,
        label: value.prompt, // Assumo che l'ID corretto sia value.promptID
      }));
      console.log(options);

      // Imposta il primo valore come selezionato di default
      if (options.length > 0) {
      }
    }

    initializeOptions();
  }, [rowsPromptTable]);

  // // Effetto per eseguire la chiamata API quando cambia selectedOption
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await callAPI(buildURL(rootAPI, `admin/queries?promptID=${selectedOption}`), "GET");
  //       const rowsQueries = data.response.map((item) => ({
  //         date: item.date,
  //         prompt: item.prompt,
  //         promptID: item.id,
  //       }));
  //       setQueriesTableRows(rowsQueries);

  //       const columnsQueries = [
  //         {
  //           Header: "promptid",
  //           accessor: "promptID",
  //           align: "left",
  //           Cell: ({ value }) => (
  //             <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
  //               {value}
  //             </MDTypography>
  //           ),
  //         },
  //         {
  //           Header: "date",
  //           accessor: "date",
  //           align: "left",
  //           Cell: ({ value }) => (
  //             <MDTypography variant="caption" color="text" fontWeight="medium">
  //               {value}
  //             </MDTypography>
  //           ),
  //         },
  //         {
  //           Header: "Prompt",
  //           accessor: "prompt",
  //           align: "left",
  //           Cell: ({ value }) => (
  //             <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
  //               {value}
  //             </MDTypography>
  //           ),
  //         },
  //         // Puoi aggiungere altre colonne se necessario
  //       ];
  //       setQueriesTableColumns(columnsQueries);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   if (selectedOption !== "") {
  //     fetchData();
  //   }
  // }, [selectedOption]);

  // // Gestione del cambiamento nel menu
  // const handleChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <PromptsHandler rows={rowsPromptTable} columns={columnsPromptTable} />
          {/* <Grid item xs={12} md={4}>
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
                    value={selectedOption}
                    onChange={handleChange}
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
            </Card>
          </Grid> */}
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PromptsManager;
