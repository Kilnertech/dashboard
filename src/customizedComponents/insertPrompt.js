import  { useState } from 'react';
import { Box, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MDButton from 'components/MDButton';

const ClearableTextField = ({ label, variant, fullWidth, value, onChange, disabled }) => {
  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <TextField
      label={label}
      variant={variant}
      fullWidth={fullWidth}
      value={value}
      onChange={onChange}
      disabled={disabled}
      multiline
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
  );
};

const Prompt = ({ onSave, onCancel, disabled, value, type }) => {
  const [promptText, setPromptText] = useState(value);

  const handleClear = () => {
    setPromptText('');
  };

  const handleSave = () => {
    onSave(promptText);
    setPromptText('');
  };

  const handleCancel = () => {
    setPromptText('');
    onCancel();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} my={2}>
      <ClearableTextField
        label={`Add new ${type}`}
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
