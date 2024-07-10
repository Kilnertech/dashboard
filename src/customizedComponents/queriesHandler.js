import { useState, useEffect } from "react";
import { Grid, MenuItem, Select, FormControl, InputLabel, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { callAPI, buildURL, rootAPI } from "api/callAPI";

function QueriesManager({ rows }) {
  // Creo l'array di opzioni per il menu
  const options = rows.map((value, index) => ({
    value: value.promptID,
    label: value.prompt, // Assumo che l'ID corretto sia value.id, controlla che sia corretto per la tua struttura dati
  }));

  // Inizializzo lo stato per il valore selezionato nel menu
  const [selectedOption, setSelectedOption] = useState(options.length > 0 ? options[0].value : "");

  // Stato per memorizzare i dati ottenuti dalla chiamata API
  const [dataRows, setDataRows] = useState([]);

  // Effetto per eseguire la chiamata API quando cambia selectedOption
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await callAPI(buildURL(rootAPI, `admin/queries?promptID=${selectedOption}`), "GET");
        setDataRows(data.response);
        const rowsQueries = data.response.map((item) => ({
          date: item.date,
          prompt: item.prompt,
          promptID: item.id
      
        }));
        setQueriesTableRows(rowsQueries);
      
        const columnsQueries = [
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
      
          // You can add more columns as needed
        ];
        setQueriesTableColumns(columnsQueries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (selectedOption !== "") {
      fetchData();
    }
  }, [selectedOption]);

  // Gestione del cambiamento nel menu
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
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
              style={{ minHeight: 40 }} // Larghezza minima del select
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </MDBox>

        {dataRows.map((item, index) => (
          <MDTypography key={index} variant="body1" color="text.primary">
            Date: {item.date}, Prompt ID: {item.id}, Prompt: {item.prompt}
          </MDTypography>
        ))}
      </Card>
    </Grid>
  );
}

export default QueriesManager;
