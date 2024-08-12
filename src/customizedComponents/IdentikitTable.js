import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Card, ToggleButton, ToggleButtonGroup } from '@mui/material';
import MDTypography from 'components/MDTypography';
import MDBox from 'components/MDBox';
import MDAvatar from 'components/MDAvatar';
import { callAPI, buildURL, rootAPI } from 'api/callAPI';

// Utility functions
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

export function CreateAuthorsTableData(term) {
  const [mepList, setMepList] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await callAPI(
          buildURL(rootAPI, `MEPs/mep_info?term=${term}`),
          'GET'
        );
        setMepList(data.response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [term]);

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

  // Sort rows by surname (last name) initially
  const sortedRows = [...rows].sort((a, b) => {
    const surnameA = a.mp.name.split(' ')[0].toLowerCase(); // Extract surname
    const surnameB = b.mp.name.split(' ')[0].toLowerCase(); // Extract surname
    return surnameA.localeCompare(surnameB);
  });

  const columns = [
    {
      field: 'mp',
      headerName: 'MP',
      width: 200,
      renderCell: ({ value }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
          <MDAvatar src={value.imgLink} name={value.name} size="sm" />
          <MDBox ml={2} lineHeight={1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              <a
                href={value.href}
                rel="noopener noreferrer"
                target="_blank"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {value.name}
              </a>
            </MDTypography>
          </MDBox>
        </MDBox>
      ),
      sortComparator: (a, b) => {
        const surnameA = a.name.split(' ')[0].toLowerCase(); // Extract surname
        const surnameB = b.name.split(' ')[0].toLowerCase(); // Extract surname
        return surnameA.localeCompare(surnameB);
      },
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1,
      renderCell: ({ value }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value}
        </MDTypography>
      ),
    },
    {
      field: 'party',
      headerName: 'Party',
      flex: 1,
      renderCell: ({ value }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value}
        </MDTypography>
      ),
    },
    {
      field: 'group',
      headerName: 'Group',
      flex: 1,
      renderCell: ({ value }) => (
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value}
        </MDTypography>
      ),
    },
  ];

  return { columns, sortedRows };
}

function IdentikitTable() {
  const [term, setTerm] = useState('10'); // Default term is '10'
  const { columns, sortedRows } = CreateAuthorsTableData(term);
  const terms = ['9', '10'];

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
          {/* Term Switcher */}
          <MDBox mt={2} display="flex" justifyContent="left">
          <ToggleButtonGroup
            value={term}
            exclusive
            onChange={(e, newTerm) => {
              if (newTerm) setTerm(newTerm);
            }}
            aria-label="term switcher"
            sx={{
              borderRadius: '20px',
              overflow: 'hidden',
              '& .MuiToggleButtonGroup-grouped': {
                border: 'none',
                borderRadius: '20px',
              },
            }}
          >
            {terms.map((termValue) => (
              <ToggleButton
                key={termValue}
                value={termValue}
                aria-label={`Term ${termValue}`}
                sx={{
                  borderRadius: '20px',
                  color: term === termValue ? 'white' : 'text.secondary',
                  backgroundColor: term === termValue ? 'grey' : 'background.default',
                  fontSize: '0.75rem',
                  padding: '4px 8px',
                  border: '1px solid',
                  borderColor: term === termValue ? 'darkgrey' : 'transparent',
                  '&.Mui-selected': {
                    backgroundColor: 'grey !important',
                    color: 'white !important',
                  },
                  '&:hover': {
                    backgroundColor: term === termValue ? 'darkgrey' : 'action.hover',
                  },
                }}
              >
                Term {termValue}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          </MDBox>
        </MDBox>
        <MDBox pt={3} px={3} pb={3}>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={sortedRows}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 50 } },
                sorting: { sortModel: [{ field: 'mp', sort: 'asc' }] }, // Default sorting by MP name
              }}
              pageSizeOptions={[5, 10, 50]}
              disableSelectionOnClick
            />
          </div>
        </MDBox>
      </Card>
    </Grid>
  );
}

export default IdentikitTable;
