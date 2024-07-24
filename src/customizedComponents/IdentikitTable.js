import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import { callAPI, buildURL, rootAPI } from 'api/callAPI';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  
  // Function to swap first name and last name
  function swapNameOrder(name) {
    const [firstName, lastName] = name.split(' ');
    return `${lastName} ${firstName}`;
  }

export function CreateAuthorsTableData() {
  const [mepList, setMepList] = useState([]);

  const Author = ({ imgLink, name, href }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={imgLink} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          <a href={href} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
            {name}
          </a>
        </MDTypography>
      </MDBox>
    </MDBox>
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await callAPI(buildURL(rootAPI, "MEPs/mep_info"), "GET");
        setMepList(data.response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData(); // Corrected placement of fetchData() call inside useEffect
  }, []); // Empty dependency array ensures useEffect runs once on mount

  const rows = mepList.map((author, index) => ({
    id: index,
    mp: {
      imgLink: author.imgLink,
      name: toTitleCase(swapNameOrder(author.name)), // Swap name order and apply Title Case
      href: author.homepage,
    },
    country: author.country,
    party: author.party,
    group: author.group,
    contacts: author.homepage,
  }));

  const columns = [
    {
      field: "mp",
      headerName: "MP",
      width: 200, // Adjust width as needed
      renderCell: ({ value }) => <Author imgLink={value.imgLink} name={value.name} href={value.href} />,
      sortComparator: (a, b) => a.name.localeCompare(b.name),
    },
    {
        field: "country",
        headerName: "Country",
        flex: 1,
        renderCell: ({ value }) => (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            {value}
          </MDTypography>
        ),
    },
    {
      field: "party",
      headerName: "Party",
      flex: 1,
      renderCell: ({ value }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value}
        </MDTypography>
      ),
    },
    {
      field: "group",
      headerName: "Group",
      flex: 1,
      renderCell: ({ value }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value}
        </MDTypography>
      ),
    },
    // You can add more columns as needed
  ];

  return { columns, rows };
}

function IdentikitTable() {
  const { columns, rows } = CreateAuthorsTableData();

  return (
    <Grid item xs={12}>
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
            Who Rule
          </MDTypography>
        </MDBox>
        <MDBox pt={3} px={3} pb={3}>
            <div style={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } }
                      }}
                    pageSizeOptions={[5,10,50]} // Default page size
                    disableSelectionOnClick
                />
            </div>
    </MDBox>
      </Card>
    </Grid>
  );
}

export default IdentikitTable;
