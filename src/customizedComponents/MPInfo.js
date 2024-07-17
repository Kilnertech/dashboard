import React, { useState } from 'react';
import { Avatar, Grid, IconButton, Accordion, AccordionSummary, AccordionDetails, Card } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SortIcon from '@mui/icons-material/Sort';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MDBox from 'components/MDBox';
import Footer from 'examples/Footer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MDTypography from 'components/MDTypography';

const MPInfo = (props) => {

    const {bioData,interventions} = props;
 
    // const bioData = {
    //     name: "John Doe",
    //     party: "Democratic Party",
    //     group: "Progressive Caucus",
    //     avgScore: 85,
    //     totalInterventions: 120,
    // };
    
    // const interventions = [
    //     { title: "Policy Discussion", date: "2024-06-01", score: 95 },
    //     { title: "Budget Review", date: "2024-05-20", score: 88 },
    //     { title: "Healthcare Reform", date: "2024-04-15", score: 76 },
    //     { title: "Education Bill", date: "2024-03-10", score: 82 },
    //     { title: "Environmental Impact", date: "2024-02-05", score: 91 },
    // ];

    const [value, setValue] = useState("questions");
    const [sortCriteria, setSortCriteria] = useState('date');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };

    const handleSort = (criteria) => {
        if (sortCriteria === criteria) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCriteria(criteria);
            setSortOrder('asc');
        }
    };

    const sortedData = [...interventions[value]].sort((a, b) => {
        if (sortCriteria === 'date') {
            return sortOrder === 'asc'
                ? new Date(a.date) - new Date(b.date)
                : new Date(b.date) - new Date(a.date);
        } else {
            return sortOrder === 'asc'
                ? a.score - b.score
                : b.score - a.score;
        }
    });

    return (
        <MDBox pt={6} pb={3} width="60%">
            <Grid item xs={20} md={4} pb={20}>
                <Card >
                    <MDBox p={3} >
                        {/* Header */}
                        <Grid container spacing={2} style={{padding: '16px', borderRadius: '8px' }}>
                            <Grid item xs={2}>
                            {bioData.imgLink ? (
                                <Avatar alt={bioData.name} src={bioData.imgLink} style={{ width: 160, height: 160 }} />
                                ) : (
                                <Avatar style={{ width: 80, height: 80 }}>{bioData.name.slice(0, 2).toUpperCase()}</Avatar>
                                )}                            
                            </Grid>
                            <Grid item xs={10} style={{ textAlign: 'right' }}>
                                <MDTypography variant="h4" component="div" fontWeight="bold">
                                    {bioData.name}
                                </MDTypography>
                                <MDTypography variant="body1" color="textSecondary" component="div">
                                    {bioData.party}
                                </MDTypography>
                                <MDTypography variant="body1" color="textSecondary" component="div">
                                    {bioData.group}
                                </MDTypography>
                                <MDTypography variant="body1" color="textSecondary" component="div">
                                    Avg Score: {bioData.avgScore}
                                </MDTypography>
                                <MDTypography variant="body1" color="textSecondary" component="div">
                                    Total Interventions: {bioData.totalInterventions}
                                </MDTypography>
                            </Grid>
                        </Grid>
                        
                        {/* Tabs */}
                        <Grid container spacing={2} paddingTop={5} justifyContent={'flex-end'}>
                            <Grid item xs={12} justifyContent={'flex-end'}>
                                <Box sx={{ width: '50%', bgcolor: 'background.paper' }} justifyContent={'flex-end'}>
                                    <Tabs value={value} onChange={handleChange} justifyContent={'flex-end'}>
                                        <Tab label="Questions" value={'questions'}/>
                                        <Tab label="Explanations Of Vote" value={'explanationsOfVote'} />
                                        <Tab label="Debates" value={'debates'} />
                                    </Tabs>
                                </Box>
                            </Grid>
                        </Grid>

                        {/* Sorting */}
                        <Grid container spacing={2} paddingTop={5}>
                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <MDTypography variant="body2" style={{ marginRight: 8 }}>Sort by:</MDTypography>
                                <IconButton onClick={() => handleSort('date')}>
                                    <MDTypography variant="body2" style={{ marginLeft: 4 }}>Date</MDTypography>
                                    {sortCriteria === 'date' && (sortOrder === 'asc' ? <SortIcon style={{ transform: 'rotate(180deg)', marginLeft: 4 }} /> : <SortIcon style={{ marginLeft: 4 }} />)}
                                </IconButton>
                                <IconButton onClick={() => handleSort('score')}>
                                    <MDTypography variant="body2" style={{ marginLeft: 4 }}>Score</MDTypography>
                                    {sortCriteria === 'score' && (sortOrder === 'asc' ? <SortIcon style={{ transform: 'rotate(180deg)', marginLeft: 4 }} /> : <SortIcon style={{ marginLeft: 4 }} />)}
                                </IconButton>
                            </Grid>
                            
                            {/* Accordion */}
                            <Grid item xs={12}>
                                {sortedData.map((item, index) => (
                                    <Accordion key={index}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Box display="flex" justifyContent="space-between" width="100%">
                                                <MDTypography variant="body1" fontWeight="bold">{item.title}</MDTypography>
                                                <Box display="flex" alignItems="center">
                                                    <MDTypography variant="body2" color="textSecondary" style={{ marginRight: 8 }}>
                                                        {item.date}
                                                    </MDTypography>
                                                    <MDTypography variant="body2" color="textSecondary">
                                                        Score: {item.score}
                                                    </MDTypography>
                                                </Box>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <MDTypography>Details for {item.title}</MDTypography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Grid>
                        </Grid>
                    </MDBox>
                </Card>
            </Grid>
        </MDBox>

    );
};

export default MPInfo;
