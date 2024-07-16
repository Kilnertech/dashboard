import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import MDTypography from "components/MDTypography";
import columnsPromptTable from 'data/columnsPromptsTable';

function CustomDataGrid(props) {
  const { handleDeletePrompt, handleEditPrompt, rows } = props;

  const formattedRows = rows.map((prompt) => ({
    ...prompt,
    id: prompt.promptID,
  }));

  const dataGridColumns = [
    {
      field: "id",
      headerName: "",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEditPrompt(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDeletePrompt(params.row)}>
            <DeleteForeverRoundedIcon />
          </IconButton>
        </div>
      ),
    },
    ...columnsPromptTable.map((col) => ({
      field: col.accessor,
      headerName: col.Header,
      flex: 1,
      renderCell: (params) => (
        col.accessor === 'prompt' ? (
          <Tooltip 
            title={
              <Box sx={{ maxWidth: 300, whiteSpace: 'normal' }}>
                <MDTypography variant="body2" color="text">
                  {params.value}
                </MDTypography>
              </Box>
            } 
            arrow 
            PopperProps={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 10],
                  },
                },
                {
                  name: 'preventOverflow',
                  options: {
                    boundariesElement: 'viewport',
                    padding: 8,
                  },
                },
                {
                  name: 'flip',
                  options: {
                    flipVariations: false,
                  },
                },
              ],
            }}
          >
            <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
              {params.value}
            </MDTypography>
          </Tooltip>
        ) : (
          <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
            {params.value}
          </MDTypography>
        )
      ),
    })),
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={formattedRows}
        columns={dataGridColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
}

export default CustomDataGrid;
