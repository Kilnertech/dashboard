import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MPInfo from '../../customizedComponents/MPInfo';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { usePromptTable } from 'context';
import { useQueriesTable } from 'context';
import { Grid, MenuItem, Select, FormControl, InputLabel, Card, Typography, CircularProgress, Box } from '@mui/material';
import { buildURL, rootAPI, callAPI } from 'api/callAPI';

const GradeSheets = () => {
  const { rowsPromptTable, fetchPrompts } = usePromptTable();
  const { queriesTableRows, fetchQueries } = useQueriesTable();

  const [LLMOutput, setLLMOutput] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsQuery, setOptionsQuery] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [selectedQuery, setSelectedQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const cache = useRef({})
  const fetchLLMResponses = async (queryID) => {
    setLoading(true);
    let LLMResponses;
    if (!cache.current[queryID]){
      try {
        const data = await callAPI(buildURL(rootAPI, `user/responses?queryID=${queryID}`), "GET");
        LLMResponses = await data.response;
        LLMResponses.sort((a, b) => b.totalInterventions - a.totalInterventions);
        cache.current[queryID] = LLMResponses;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    else{
      LLMResponses = cache.current[queryID]
    }
    setLLMOutput(LLMResponses);
    setLoading(false);
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
        fetchLLMResponses(opt[0].value);
      }
    }
  }, [queriesTableRows]);

  const handleChangePrompt = (event) => {
    setSelectedPrompt(event.target.value);
  };

  const handleChangeQuery = (event) => {
    setSelectedQuery(event.target.value);
    fetchLLMResponses(event.target.value);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="left" gutterBottom style={{marginTop:15}}>
            The Kilner.Tech Grade Sheets
          </Typography>
          <Typography variant="subtitle1" align="left" gutterBottom>
            Using state-of-the-art AI, we monitor and analyze EU activities, identifying trends and verifying discourse in real-time. Here our Grade Sheets.
          </Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Card>
            <FormControl fullWidth>
              <InputLabel id="dropdown-prompt-label">Select Prompt</InputLabel>
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
                style={{ minHeight: 40 }}
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
        <Grid item xs={12} md={6}>
          <Card>
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
          </Card>
        </Grid>
      </Grid>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          emulateTouch={true}
          autoPlay={false}
          showThumbs={true}
          showIndicators={true}
        >
          {LLMOutput && LLMOutput.length > 0 &&
            LLMOutput.map((mp, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                <MPInfo
                  bioData={{
                    name: mp.name,
                    imgLink: mp.imgLink,
                    instagram: mp.instagram,
                    facebook: mp.facebook,
                    website: mp.website,
                    homePage: mp.homePage,
                    email: mp.email,
                    party: mp.party,
                    group: mp.group,
                    levelOfConcern: 100 * (1 - mp.avgScore).toFixed(1),
                    country: mp.country,
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
      )}
    </DashboardLayout>
  );
};

export default GradeSheets;
