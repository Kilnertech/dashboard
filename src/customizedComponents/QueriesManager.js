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
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import MDBox from "components/MDBox";
import { buildURL, rootAPI } from "api/callAPI";
import Notification from "./Notifications";
import TextInput from "./TextInput";
import { useQueriesTable } from "context/QueriesTableContext";
import CustomDataGrid from "./DataGrid";
const QueriesManager = ({rows,columns,promptID}) => {

  const { fetchQueries } = useQueriesTable(); // Usa il contesto per queriesTableRows



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
      fetchQueries(promptID);
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
      fetchQueries(promptID);
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
      fetchQueries(promptID);
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
          <CustomDataGrid rows = {rows} 
                          columns = {columns}
                          handleEdit = {handleEditQuery}
                          handleDelete = {handleDeleteQuery}
                          
          />
          <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2} pt={3}>
            {!isEditing && !isAddingNew && (
                <IconButton color="primary" onClick={handleAddNewQuery}>
                  {isAddingNew ? <CancelTwoToneIcon /> : <AddCircleTwoToneIcon />}
                </IconButton>
            )}
          </Box>
          {isAddingNew && <TextInput 
                            onSave={handleSaveQuery} 
                            onCancel={handleCancelQuery} 
                            promptID={promptID}
                            type="Query"
                            />
              }
          {isEditing && <TextInput 
                              onSaveEdit={handleSaveEditedQuery} 
                              text={editQueryText} 
                              onCancel={handleCancelEdit} 
                              queryID={selectedQueryId}
                              type="Query"
                              />}
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
