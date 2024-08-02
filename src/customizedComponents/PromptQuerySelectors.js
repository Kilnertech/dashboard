import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { usePromptTable } from 'context';
import { useQueriesTable } from 'context';
import { Grid, MenuItem, Select, FormControl, InputLabel, Card, Box } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const PromptsQuerySelectors = ({ onQueryUpdate }) => {
  const { rowsPromptTable, fetchPrompts } = usePromptTable();
  const { queriesTableRows, fetchQueries } = useQueriesTable();
  const [options, setOptions] = useState([]);
  const [optionsQuery, setOptionsQuery] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [selectedQuery, setSelectedQuery] = useState('');

  useEffect(() => {
    fetchPrompts();
  }, []);

  useEffect(() => {
    if (rowsPromptTable.length > 0) {
      const opt = rowsPromptTable.map((value) => ({
        value: value.promptID,
        label: value.promptTitle,
      }));
      setOptions(opt);
      if (opt.length > 0) {
        setSelectedPrompt(opt[0].value);
      }
    }
  }, [rowsPromptTable]);

  useEffect(() => {
    if (selectedPrompt !== "") {
      fetchQueries(selectedPrompt);
    }
  }, [selectedPrompt]);

  useEffect(() => {
    if (queriesTableRows.length > 0) {
      const opt = queriesTableRows.map((value) => ({
        value: value.queryID,
        label: value.query,
      }));
      setOptionsQuery(opt);
      if (opt.length > 0) {
        setSelectedQuery(opt[0].value);
        onQueryUpdate(opt[0].value);
      }
    }
  }, [queriesTableRows]);

  const handleChangePrompt = (event) => {
    setSelectedPrompt(event.target.value);
  };

  const handleChangeQuery = (event) => {
    setSelectedQuery(event.target.value);
    onQueryUpdate(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Card sx={{ padding: 2, width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel id="dropdown-prompt-label">Select Agent</InputLabel>
              <Select
                labelId="dropdown-prompt-label"
                value={selectedPrompt}
                onChange={handleChangePrompt}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 600,
                      maxWidth: 500,
                    },
                  },
                }}
                sx={{ minHeight: 40 }}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Card>
        </Grid>
        <Grid item xs={12} md={12} container direction="column" alignItems="center">
          <Box sx={{ display: 'flex', alignItems: 'center', marginY: 0 }}>
            <ArrowDownwardIcon sx={{ fontSize: 40 }} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Card sx={{ padding: 2, width: '100%' }}>
            <FormControl fullWidth>
              <InputLabel id="dropdown-query-label">Select Query</InputLabel>
              <Select
                labelId="dropdown-query-label"
                value={selectedQuery}
                onChange={handleChangeQuery}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 600,
                      maxWidth: 500,
                    },
                  },
                }}
                sx={{ minHeight: 40 }}
              >
                {optionsQuery.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PromptsQuerySelectors;
