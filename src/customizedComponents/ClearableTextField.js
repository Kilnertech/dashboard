import { TextField, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

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

export {ClearableTextField}