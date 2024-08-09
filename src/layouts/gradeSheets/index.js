import React, { useState, useRef } from 'react';
import MPInfo from '../../customizedComponents/MPInfo';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Grid, Typography, CircularProgress, Box, Button, IconButton } from '@mui/material';
import { buildURL, rootAPI, callAPI } from 'api/callAPI';
import PromptsQuerySelectors from 'customizedComponents/PromptQuerySelectors';
import SortIcon from '@mui/icons-material/Sort';

const ITEMS_PER_LOAD = 10;

const GradeSheets = () => {
  const [LLMOutput, setLLMOutput] = useState([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(false);
  const [allItemsLoaded, setAllItemsLoaded] = useState(false);
  const [sortCriteria, setSortCriteria] = useState('totalInterventions');
  const [sortOrder, setSortOrder] = useState('desc');
  const cache = useRef({});

  const fetchLLMResponses = async (queryID) => {
    setLoading(true);
    let LLMResponses = [];
    try {
      if (!cache.current[queryID]) {
        const data = await callAPI(buildURL(rootAPI, `user/grade_sheets?queryID=${queryID}`), "GET");
        LLMResponses = await data.response;
        LLMResponses = Array.isArray(LLMResponses) ? LLMResponses : [];
        cache.current[queryID] = LLMResponses;
      } else {
        LLMResponses = cache.current[queryID];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLLMOutput(LLMResponses);
      setVisibleItems(ITEMS_PER_LOAD);
      setAllItemsLoaded(LLMResponses.length <= ITEMS_PER_LOAD);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleItems(prevVisibleItems => {
      const newVisibleCount = prevVisibleItems + ITEMS_PER_LOAD;
      if (newVisibleCount >= LLMOutput.length) {
        setAllItemsLoaded(true);
      }
      return newVisibleCount;
    });
  };

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCriteria(criteria);
      setSortOrder('desc');
    }
  };

  const sortedLLMOutput = [...LLMOutput].sort((a, b) => {
    const compareValue = (criteria) => {
      if (criteria === 'totalInterventions') {
        return a.totalInterventions - b.totalInterventions;
      } else if (criteria === 'levelOfConcern') {
        return (100 * (1 - a.avgScore)) - (100 * (1 - b.avgScore));
      }
      return 0;
    };
    return sortOrder === 'asc' ? compareValue(sortCriteria) : -compareValue(sortCriteria);
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="left" gutterBottom style={{ marginTop: 15 }}>
            The Kilner.Tech Grade Sheets
          </Typography>
          <Typography variant="subtitle1" align="left" gutterBottom>
            Using state-of-the-art AI, we monitor and analyze EU activities, identifying trends and verifying discourse in real-time. Here are our Grade Sheets.
          </Typography>
        </Grid>
        <PromptsQuerySelectors onQueryUpdate={fetchLLMResponses} />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ mr: 1 }}>Sort by:</Typography>
          <IconButton onClick={() => handleSort('totalInterventions')}>
            <Typography variant="body2" sx={{ mr: 1 }}>Total Interventions</Typography>
            {sortCriteria === 'totalInterventions' && (sortOrder === 'asc' ? <SortIcon sx={{ transform: 'rotate(180deg)' }} /> : <SortIcon />)}
          </IconButton>
          <IconButton onClick={() => handleSort('levelOfConcern')}>
            <Typography variant="body2" sx={{ mr: 1 }}>Level of Concern</Typography>
            {sortCriteria === 'levelOfConcern' && (sortOrder === 'asc' ? <SortIcon sx={{ transform: 'rotate(180deg)' }} /> : <SortIcon />)}
          </IconButton>
        </Box>
      </Grid>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
            {sortedLLMOutput.slice(0, visibleItems).map((mp, index) => (
              <Grid item xs={12} sm={12} md={12} lg={12} key={index} justifyContent="center" alignItems="center">
                <Box>
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
                      levelOfConcern: (100 * (1 - mp.avgScore)).toFixed(1),
                      country: mp.country,
                      totalInterventions: mp.totalInterventions,
                    }}
                    interventions={{
                      questions: mp.questions,
                      explanationsOfVote: mp.explanationsOfVote,
                      debates: mp.debates,
                    }}
                  />
                </Box>
              </Grid>
            ))}

          {!allItemsLoaded && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Button variant="contained" onClick={handleLoadMore}>
                Load More
              </Button>
            </Box>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default GradeSheets;
