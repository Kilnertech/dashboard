// columnsQueries.js
import MDTypography from "components/MDTypography";

const columnsQueries = [
  {
    Header: "queryID",
    accessor: "queryID",
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
    Header: "query",
    accessor: "query",
    align: "left",
    Cell: ({ value }) => (
      <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
        {value}
      </MDTypography>
    ),
  },
  // Puoi aggiungere altre colonne se necessario
];

export default columnsQueries;
