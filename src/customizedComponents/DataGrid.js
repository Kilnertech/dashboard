import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import MDTypography from "components/MDTypography";

function CustomDataGrid(props) {
  const { handleDelete, handleEdit, rows, columns } = props;

  const [open, setOpen] = useState(false);
  const [agentTask, setAgentTask] = useState('');
  const [agent, setAgent] = useState('');

  const handleClickOpen = (prompt, promptTitle) => {
    setAgentTask(prompt);
    setAgent(promptTitle);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAgentTask('');
    setAgent('');
  };

  // Function to parse and convert date strings to Date objects
  const parseDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Handle invalid date string
      return null;
    }
    return date;
  };

  // Format rows and parse dates
  const formattedRows = rows.map((prompt, index) => ({
    ...prompt,
    id: index,
    date: parseDate(prompt.date),  // Assuming the date field is named "date"
  }));

  const formatDate = (date) => {
    if (!date) return '';
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', '');
  };

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
      sortable: col.accessor === 'date',
      sortComparator: col.accessor === 'date' ? (v1, v2) => v1 - v2 : undefined,
      renderCell: (params) => (
        col.accessor === 'promptTitle' ? (
          <Box display="flex" alignItems="center">
            <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
              {params.value}
            </MDTypography>
            <IconButton onClick={() => handleClickOpen(params.row.prompt, params.row.promptTitle)}>
              <SearchIcon />
            </IconButton>
          </Box>
        ) : (
          <MDTypography variant="caption" color="text" fontWeight="medium" noWrap>
            {col.accessor === 'date' ? formatDate(params.value) : params.value}
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
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 50]}
        disableSelectionOnClick
      />
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            {agent} - Task
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ whiteSpace: 'pre-wrap' }}>
            <MDTypography variant="body2" color="text">
              {agentTask}
            </MDTypography>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CustomDataGrid;
