import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import MPInfo from '../../customizedComponents/MPInfo';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import { buildURL, rootAPI, callAPI } from 'api/callAPI';
import PromptsQuerySelectors from 'customizedComponents/PromptQuerySelectors';

const GradeSheets = () => {


  const [LLMOutput, setLLMOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const cache = useRef({})
  const fetchLLMResponses = async (queryID) => {
    setLoading(true);
    let LLMResponses;
    if (!cache.current[queryID]){
      try {
        const data = await callAPI(buildURL(rootAPI, `user/grade_sheets?queryID=${queryID}`), "GET");
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
        <PromptsQuerySelectors onQueryUpdate = {fetchLLMResponses} />
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
