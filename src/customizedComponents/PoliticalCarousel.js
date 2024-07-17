import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel'; // Example carousel library import
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Example carousel styles
import MPInfo from './MPInfo'; // Adjust the path as per your project structure
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { usePromptTable } from 'context';
import { useQueriesTable } from 'context';
import { Grid, MenuItem, Select, FormControl, InputLabel, Card, Button } from '@mui/material';
import { buildURL, rootAPI, callAPI } from 'api/callAPI';

const PoliticalCarousel = () => {
  const { rowsPromptTable, fetchPrompts } = usePromptTable();
  const { queriesTableRows, fetchQueries } = useQueriesTable();

  const [LLMOutput, setLLMOutput] = useState([]);

  const [options, setOptions] = useState([]);
  const [optionsQuery, setOptionsQuery] = useState([]);

  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [selectedPromptLabel, setSelectedPromptLabel] = useState('');

  const [selectedQuery, setSelectedQuery] = useState('');
  const [selectedQueryLabel, setSelectedQueryLabel] = useState('');

  const fetchLLMResponses = async (queryID) => {
    try {
      const data = await callAPI(buildURL(rootAPI, `user/responses?queryID=${queryID}`), "GET");
      const LLMResponses = await data.response;
      LLMResponses.sort((a, b) => b.totalInterventions - a.totalInterventions);
      setLLMOutput(LLMResponses);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  useEffect(() => {
    if (rowsPromptTable.length > 0) {
      const opt = rowsPromptTable.map((value) => ({
        value: value.promptID,
        label: value.prompt,
      }));
      setOptions(opt);
      if (opt.length > 0) {
        setSelectedPrompt(opt[0].value);
        setSelectedPromptLabel(opt[0].label);
      }
    }
  }, [rowsPromptTable]);

  useEffect(() => {
    if (selectedPrompt !== '') {
      fetchQueries(selectedPrompt);
      if (queriesTableRows.length > 0) {
        const opt = queriesTableRows.map((value) => ({
          value: value.queryID,
          label: value.query,
        }));
        setOptionsQuery(opt);
        if (opt.length > 0) {
          setSelectedQuery(opt[0].value);
          setSelectedQueryLabel(opt[0].label);
          fetchLLMResponses(opt[0].value); // Fetch responses for the selected query
        }
      }
    }
  }, [selectedPrompt]);

  const handleChangePrompt = (event) => {
    setSelectedPrompt(event.target.value);
  };

  const handleChangeQuery = (event) => {
    setSelectedQuery(event.target.value);
    fetchLLMResponses(event.target.value); // Fetch responses for the selected query
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="dropdown-prompt-label">Select Prompt</InputLabel>
            <Select
              labelId="dropdown-prompt-label"
              value={selectedPrompt}
              onChange={handleChangePrompt}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 600, // Max height of the menu
                    maxWidth: 500,
                  },
                },
              }}
              style={{ minHeight: 40 }}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
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
              style={{ minHeight: 40 }}
            >
              {optionsQuery.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        emulateTouch={true}
        autoPlay={false}
        showThumbs={true} // Show navigation buttons (thumbs) for paging
        showIndicators={true} // Show indicators (dots) for paging
      >
        {LLMOutput && LLMOutput.length > 0 &&
          LLMOutput.map((mp, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
              <MPInfo
                bioData={{
                  name: mp.name,
                  imgLink: mp.imgLink,
                  party: mp.party,
                  group: mp.group,
                  avgScore: mp.avgScore,
                  totalInterventions: mp.totalInterventions,
                }}
                interventions={{
                  questions: mp.questions,
                  explanationsOfVote: mp.explanationsOfVote,
                  debates: mp.debates,
                }}
              />
            </div>
          ))}
      </Carousel>
    </DashboardLayout>
  );
};

export default PoliticalCarousel;
