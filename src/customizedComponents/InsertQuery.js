import  { useState } from 'react';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import MDButton from 'components/MDButton';
import { ClearableTextField } from './ClearableTextField';

const Query = ({ onSave, onSaveEdit, onCancel, disabled, text, promptID, queryID }) => {
  
  const [queryText, setQueryText] = useState(text);

  const handleClear = () => {
    setQueryText('');
  };

  const handleSave = () => {
    if(onSave){
      onSave(queryText,promptID);
    }
    else if (onSaveEdit){
      onSaveEdit(queryText,queryID);
    }
    setQueryText('');
  };

  const handleCancel = () => {
    setQueryText('');
    onCancel();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} my={2}>
      <ClearableTextField
        label={`Add new Query`}
        variant="outlined"
        fullWidth
        value={queryText}
        onChange={(e) => setQueryText(e.target.value)}
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

export default Query;
