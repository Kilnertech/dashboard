import  { useState } from 'react';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MDButton from 'components/MDButton';
import { ClearableTextField } from './ClearableTextField';

const Prompt = ({ onSave, onSaveEdit,promptID , onCancel, disabled, text }) => {
  const [promptText, setPromptText] = useState(text);


  const handleClear = () => {
    setPromptText('');
  };

  const handleSave = () => {
    if (onSave){
      onSave(promptText);
    }
    else if (onSaveEdit){
      onSaveEdit(promptText,promptID);
    }
    setPromptText('');
  };

  const handleCancel = () => {
    setPromptText('');
    onCancel();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} my={2}>
      <ClearableTextField
        label={`Add new Prompt`}
        variant="outlined"
        fullWidth
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        disabled={disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} disabled={disabled}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box display="flex" justifyContent="flex-end" gap={2} width="100%">
        <MDButton variant="contained" color="error" onClick={handleCancel} disabled={disabled}>
          Cancel
        </MDButton>
        <Button variant="contained" sx={{ bgcolor: 'success.main', color: 'white' }} onClick={handleSave} disabled={disabled}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default Prompt;
