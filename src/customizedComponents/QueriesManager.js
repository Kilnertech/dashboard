import { useState } from "react";
import {
  Grid,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import EditIcon from "@mui/icons-material/Edit";
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import MDBox from "components/MDBox";
import Query from "./InsertQuery";
import DataTable from "examples/Tables/DataTable";
import { buildURL, rootAPI } from "api/callAPI";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Notification from "./notifications";

const QueriesManager = ({rows,columns,promptID}) => {


  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQueryId, setSelectedQueryId] = useState("");
  const [editQueryText, setEditQueryText] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false); // Stato per gestire l'apertura del dialogo di conferma


  const handleSaveQuery = async (query,promptID) => {
    console.log(query,promptID);
    try {
      const response = await fetch(buildURL(rootAPI, 'admin/add_query'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query, promptID: promptID }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Mostra la notifica di successo
      setNotification({
        open: true,
        type: "success",
        title: "Query Saved",
        message: "The Query was saved successfully: " + query.substring(0, 12) + " ...",
      });

      // Aggiorna l'interfaccia o gestisci il successo come preferisci
      setIsAddingNew(false);
      setIsEditing(false);
    } catch (error) {
      // Mostra la notifica di errore
      setNotification({
        open: true,
        type: "error",
        title: "Error Saving Prompt",
        message: "There was an error while saving the prompt.",
      });
    }
  };

  const handleDeleteQuery = (row) => {
    setSelectedQueryId(row.queryID);
    setConfirmationOpen(true); // Apre il dialogo di conferma
  };

  const deleteQuery = async () => {
    try {
      // Esegui la richiesta di eliminazione
      const response = await fetch(buildURL(rootAPI, 'admin/delete_query'), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ queryID: selectedQueryId }), // Invia gli ID dei prompt da eliminare
      });

      if (!response.ok) {
        throw new Error(`Failed to delete prompts. Status: ${response.status}`);
      }

      const data = await response.json();

      // Mostra la notifica di successo
      setNotification({
        open: true,
        type: "success",
        title: "Query Deleted",
        message: "The Query was deleted successfully.",
      });

      // Chiudi il dialogo di conferma
      setConfirmationOpen(false);

      // Aggiorna l'interfaccia o gestisci il successo come preferisci
      setIsAddingNew(false);
      setIsEditing(false);
    } catch (error) {
      // Mostra la notifica di errore
      setNotification({
        open: true,
        type: "error",
        title: "Error Deleting Query",
        message: `There was an error while deleting the query: ${error}`,
      });
    }
  };

  const handleAddNewQuery = () => {
    setIsAddingNew(!isAddingNew);
  };

  const handleEditQuery = (selection) => {
    setSelectedQueryId(selection.queryID);
    setEditQueryText(selection.query);
    setIsEditing(true);
    setIsAddingNew(false);
  };

  const handleSaveEditedQuery = async (newQuery,queryID) => {
    console.log(newQuery,queryID);
    try {
      const response = await fetch(buildURL(rootAPI, 'admin/edit_query'), {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newQuery: newQuery, queryID: queryID }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Mostra la notifica di successo
      setNotification({
        open: true,
        type: "success",
        title: "Query Edited",
        message: "The Query was saved Edited: " + newQuery.substring(0, 12) + " ...",
      });

      // Aggiorna l'interfaccia o gestisci il successo come preferisci
      setIsAddingNew(false);
      setIsEditing(false);
    } catch (error) {
      // Mostra la notifica di errore
      setNotification({
        open: true,
        type: "error",
        title: "Error Editing Query",
        message: "There was an error while editing the query.",
      });
    }
    setIsEditing(false);
  };

  const handleCancelQuery = () => {
    setIsAddingNew(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditQueryText("");
  };

  const handleCloseDialog = () => {
    setConfirmationOpen(false); // Chiude il dialogo di conferma
  };

  const closeNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <Grid item xs={12}>

        <MDBox pt={3} px={2}>
          <DataTable
            table={{
              columns: [
                {
                  Header: "",
                  accessor: "id",
                  align: "center",
                  disableSortBy: true,
                  disableToggleSortBy: true,
                  Cell: ({ row }) => (
                    <div>
                      <IconButton onClick={() => handleEditQuery(row.original)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteQuery(row.original)}>
                        <DeleteForeverRoundedIcon />
                      </IconButton>
                    </div>
                  ),
                },
                ...columns,
              ],
              rows: rows.map((prompt) => ({
                ...prompt,
                id: prompt.id,
              })),
            }}
            isSorted={true}
            entriesPerPage={true}
            showTotalEntries={false}
            noEndBorder
          />
          {!isEditing && !isAddingNew && (
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <IconButton color="primary" onClick={handleAddNewQuery}>
                {isAddingNew ? <CancelTwoToneIcon /> : <AddCircleTwoToneIcon />}
              </IconButton>
            </Box>
          )}
          {isAddingNew && <Query 
                            onSave={handleSaveQuery} 
                            onCancel={handleCancelQuery} 
                            promptID={promptID}
                            />
              }
          {isEditing && <Query 
                              onSaveEdit={handleSaveEditedQuery} 
                              text={editQueryText} 
                              onCancel={handleCancelEdit} 
                              queryID={selectedQueryId} />}
        </MDBox>

      {/* Dialogo di conferma */}
      <Dialog
        open={confirmationOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this : {selectedQueryId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteQuery} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notifica */}
      <Notification
        open={notification.open}
        onClose={closeNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </Grid>
  );
};

export default QueriesManager;
