import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Tooltip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import MDTypography from "components/MDTypography";

function CustomDataGrid(props) {
  const { handleDelete, handleEdit, rows, columns } = props;

  const formattedRows = rows.map((prompt, index) => ({
    ...prompt,
    id: index,
  }));

  const dataGridColumns = [
    ...(handleDelete && handleEdit ? [{
      field: "actions",
      headerName: "",
      width: 90,  // Adjust this value as needed to fit the icons
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)}>
            <DeleteForeverRoundedIcon />
          </IconButton>
        </div>
      ),
    }] : []),
    ...columns.map((col) => ({
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
