// columnsPromptTable.js
import MDTypography from "components/MDTypography";

const columnsPromptTable = [
  // {
  //   Header: "ID",
  //   accessor: "promptID",
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
  // {
  //   Header: "Prompt",
  //   accessor: "prompt",
  //   align: "left",
  //   Cell: ({ value }) => (
  //     <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
  //       {value}
  //     </MDTypography>
  //   ),
  // },
  {
    Header: "Agent",
    accessor: "promptTitle",
    align: "left",
    Cell: ({ value }) => (
      <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
        {value}
      </MDTypography>
    ),
  },
  // Add more columns as needed
];

export default columnsPromptTable;
