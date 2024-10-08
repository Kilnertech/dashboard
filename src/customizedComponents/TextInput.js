import { useState } from 'react';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MDButton from 'components/MDButton';
import { ClearableTextField } from './ClearableTextField';

const TextInput = ({ 
  onSave, 
  onSaveEdit, 
  onCancel, 
  disabled, 
  text, 
  promptID, 
  queryID, 
  type 
}) => {
  const [inputText, setInputText] = useState(text);
  const [agentTitle, setAgentTitle] = useState('');

  const handleClear = () => {
    setInputText('');
    setAgentTitle(''); // Clear agent title as well
  };

  const handleSave = () => {
    if (onSave) {
      if (type === 'Query') {
        onSave(inputText, promptID);
      } else if (type === 'Prompt') {
        onSave(inputText, agentTitle);
      }
    } else if (onSaveEdit) {
      if (type === 'Query') {
        onSaveEdit(inputText, queryID);
      } else if (type === 'Prompt') {
        onSaveEdit(inputText, promptID);
      }
    }
    setInputText('');
    setAgentTitle(''); // Clear agent title after saving
    onCancel();
  };

  const handleCancel = () => {
    setInputText('');
    setAgentTitle(''); // Clear agent title on cancel
    onCancel();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} my={2}>
      <ClearableTextField
        label={`Add new ${type}`}
        variant="outlined"
        fullWidth
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
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
      {type === 'Prompt' && onSave && (
        <ClearableTextField
          label="Agent Title"
          variant="outlined"
          fullWidth
          value={agentTitle}
          onChange={(e) => setAgentTitle(e.target.value)}
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
      )}
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

export default TextInput;
