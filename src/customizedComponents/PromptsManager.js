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
import { usePromptTable } from "context";
import CustomDataGrid from "./DataGrid";

const PromptsManager = ({rows,columns}) => {

  const { fetchPrompts } = usePromptTable(); // Usa il contesto
  const [selectedPromptId, setSelectedPromptId] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPromptText, setEditPromptText] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false); // Stato per gestire l'apertura del dialogo di conferma


  const handleSavePrompt = async (promptText) => {
    try {
      console.log(promptText);
      const response = await fetch(buildURL(rootAPI, 'admin/add_prompt'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Mostra la notifica di successo
      setNotification({
        open: true,
        type: "success",
        title: "Prompt Saved",
        message: "The prompt was saved successfully: " + promptText.substring(0, 12) + " ...",
      });

      // Aggiorna l'interfaccia o gestisci il successo come preferisci
      setIsAddingNew(false);
      setIsEditing(false);
      fetchPrompts();
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

  const handleDeletePrompt = (row) => {
    setSelectedPromptId(row.promptID);
    setConfirmationOpen(true); // Apre il dialogo di conferma
  };

  const deletePrompt = async () => {
    try {
      const promptID = selectedPromptId;
      // Esegui la richiesta di eliminazione
      const response = await fetch(buildURL(rootAPI, 'admin/delete_prompt'), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promptID: promptID }), // Invia gli ID dei prompt da eliminare
      });

      if (!response.ok) {
        throw new Error(`Failed to delete prompts. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Prompt deleted:', data);

      // Mostra la notifica di successo
      setNotification({
        open: true,
        type: "success",
        title: "Prompt Deleted",
        message: "The prompt was deleted successfully.",
      });

      // Chiudi il dialogo di conferma
      setConfirmationOpen(false);

      // Aggiorna l'interfaccia o gestisci il successo come preferisci
      setIsAddingNew(false);
      setIsEditing(false);
      fetchPrompts();
    } catch (error) {
      // Mostra la notifica di errore
      setNotification({
        open: true,
        type: "error",
        title: "Error Deleting Prompt",
        message: `There was an error while deleting the prompt: ${error}`,
      });
    }
  };

  const handleAddNewPrompt = () => {
    setIsAddingNew(!isAddingNew);
  };

  const handleEditPrompt = (prompt) => {
    console.log("editing prompt");
    setSelectedPromptId(prompt.promptID);
    setEditPromptText(prompt.prompt);
    setIsEditing(true);
    setIsAddingNew(false);
  };

  const handleSaveEditedPrompt = async (newPrompt,promptID) => {
    console.log(newPrompt,promptID);
    try {
      const response = await fetch(buildURL(rootAPI, 'admin/edit_prompt'), {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPrompt: newPrompt, promptID: promptID }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Mostra la notifica di successo
      setNotification({
        open: true,
        type: "success",
        title: "Prompt Edited",
        message: "The Prompt was saved Edited: " + newPrompt.substring(0, 12) + " ...",
      });

      // Aggiorna l'interfaccia o gestisci il successo come preferisci
      setIsAddingNew(false);
      setIsEditing(false);
      fetchPrompts();
    } catch (error) {
      // Mostra la notifica di errore
      setNotification({
        open: true,
        type: "error",
        title: "Error Editing Prompt",
        message: "There was an error while editing the prompt.",
      });
    }
    setIsEditing(false);
  };

  const handleCancelPrompt = () => {
    setIsAddingNew(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditPromptText("");
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
                          handleEditPrompt = {handleEditPrompt}
                          handleDeletePrompt = {handleDeletePrompt}
                          handleAssP
                          
          />
          {!isEditing && !isAddingNew && (
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <IconButton color="primary" onClick={handleAddNewPrompt}>
                {isAddingNew ? <CancelTwoToneIcon /> : <AddCircleTwoToneIcon />}
              </IconButton>
            </Box>
          )}
          {isAddingNew && <TextInput onSave={handleSavePrompt} 
                                  onCancel={handleCancelPrompt} 
                                  type="Prompt"
                                  />}
          {isEditing && <TextInput onSaveEdit={handleSaveEditedPrompt} 
                                text={editPromptText} 
                                onCancel={handleCancelEdit}
                                promptID={selectedPromptId}
                                type="Prompt"

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
            Are you sure you want to delete this : {selectedPromptId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={deletePrompt} color="secondary">
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

export default PromptsManager;
