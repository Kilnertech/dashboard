// columnsQueries.js
import MDTypography from "components/MDTypography";

const columnsQueries = [
  // {
  //   Header: "ID",
  //   accessor: "queryID",
  //   align: "left",
  //   Cell: ({ value }) => (
  //     <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
  //       {value}
  //     </MDTypography>
  //   ),
  // },
  {
    Header: "Date",
    accessor: "date",
    align: "left",
    Cell: ({ value }) => (
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}
      </MDTypography>
    ),
  },
  {
    Header: "Query",
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
