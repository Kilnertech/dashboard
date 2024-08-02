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

const PromptsManager = ({ rows, columns }) => {
  const { fetchPrompts } = usePromptTable(); // Use context
  const [selectedPromptId, setSelectedPromptId] = useState("");
  const [selectedPromptAgent, setSelectedPromptAgent] = useState("");

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPromptText, setEditPromptText] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State for confirmation dialog

  const handleSavePrompt = async (promptText, promptTitle) => {
    try {
      console.log(promptText);
      const response = await fetch(buildURL(rootAPI, 'admin/add_prompt'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText, promptTitle: promptTitle }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Show success notification
      setNotification({
        open: true,
        type: "success",
        title: "Prompt Saved",
        message: "The prompt was saved successfully: " + promptText.substring(0, 12) + " ...",
      });

      setIsAddingNew(false);
      setIsEditing(false);
      fetchPrompts();
    } catch (error) {
      // Show error notification
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
    setSelectedPromptAgent(row.promptTitle);
    setConfirmationOpen(true); // Open confirmation dialog
  };

  const deletePrompt = async () => {
    try {
      const promptID = selectedPromptId;
      const response = await fetch(buildURL(rootAPI, 'admin/delete_prompt'), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promptID: promptID }), // Send prompt ID to delete
      });

      if (!response.ok) {
        throw new Error(`Failed to delete prompts. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Prompt deleted:', data);

      // Show success notification
      setNotification({
        open: true,
        type: "success",
        title: "Prompt Deleted",
        message: "The prompt was deleted successfully.",
      });

      setConfirmationOpen(false);
      setIsAddingNew(false);
      setIsEditing(false);
      fetchPrompts();
    } catch (error) {
      // Show error notification
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

  const handleSaveEditedPrompt = async (newPrompt, promptID) => {
    console.log(newPrompt, promptID);
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

      // Show success notification
      setNotification({
        open: true,
        type: "success",
        title: "Prompt Edited",
        message: "The Prompt was saved Edited: " + newPrompt.substring(0, 12) + " ...",
      });

      setIsAddingNew(false);
      setIsEditing(false);
      fetchPrompts();
    } catch (error) {
      // Show error notification
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
    setConfirmationOpen(false); // Close confirmation dialog
  };

  const closeNotification = () => {
    setNotification({
      ...notification,
      open: false,
    });
  };

  return (
    <Grid container spacing={2} p={2}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

              <CustomDataGrid 
                rows={rows} 
                columns={columns}
                handleEdit={handleEditPrompt}
                handleDelete={handleDeletePrompt}
              />

          <Box display="flex" justifyContent="flex-end" mb={2} pt={3}>
            {!isEditing && !isAddingNew && (
              <IconButton color="primary" onClick={handleAddNewPrompt}>
                {isAddingNew ? <CancelTwoToneIcon /> : <AddCircleTwoToneIcon />}
              </IconButton>
            )}
          </Box>
          {isAddingNew && <TextInput 
            onSave={handleSavePrompt} 
            onCancel={handleCancelPrompt} 
            type="Prompt"
          />}
          {isEditing && <TextInput 
            onSaveEdit={handleSaveEditedPrompt} 
            text={editPromptText} 
            onCancel={handleCancelEdit}
            promptID={selectedPromptId}
            type="Prompt"
          />}
        </Box>
      </Grid>

      {/* Dialog */}
      <Dialog
        open={confirmationOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this: {selectedPromptAgent}?
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

      {/* Notification */}
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
