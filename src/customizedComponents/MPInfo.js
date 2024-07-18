import React, { useState } from 'react';
import { Avatar, Grid, IconButton, Accordion, AccordionSummary, AccordionDetails, Card, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SortIcon from '@mui/icons-material/Sort';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import MDBox from 'components/MDBox';
import Footer from 'examples/Footer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MDTypography from 'components/MDTypography';

const MPInfo = (props) => {
    const toTitleCase = (str) => {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    };
    
    const { bioData, interventions } = props;
    const [value, setValue] = useState("questions");
    const [sortCriteria, setSortCriteria] = useState('date');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleChange = (event, newValue) => {
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

    const titleCaseName = toTitleCase(bioData.name);

    return (
        <MDBox pt={6} pb={3} width="60%">
            <Grid item xs={20} md={4} pb={20}>
                <Card >
                    <MDBox p={3} >
                        {/* Header */}
                        <Grid container spacing={2} style={{padding: '16px', borderRadius: '8px' }}>
                            <Grid item xs={2}>
                                {bioData.imgLink ? (
                                    <Link href={bioData.homePage} target="_blank" rel="noopener noreferrer">
                                        <Avatar alt={titleCaseName} src={bioData.imgLink} style={{ width: 160, height: 160 }} />
                                    </Link>
                                ) : (
                                    <Avatar style={{ width: 80, height: 80 }}>{titleCaseName.slice(0, 2).toUpperCase()}</Avatar>
                                )}
                            </Grid>
                            <Grid item xs={10} style={{ textAlign: 'right' }}>
                                <Link href={bioData.homePage} target="_blank" rel="noopener noreferrer" underline="none">
                                    <MDTypography variant="h4" component="div" fontWeight="bold">
                                        {titleCaseName}
                                    </MDTypography>
                                </Link>
                                <MDTypography variant="body2" color="textSecondary" component="div">
                                    {bioData.country}
                                </MDTypography>
                                <MDTypography variant="body2" color="textSecondary" component="div" style={{ marginTop: 12 }}>
                                    {bioData.party}
                                </MDTypography>
                                <MDTypography variant="body2" color="textSecondary" component="div">
                                    {bioData.group}
                                </MDTypography>
                                <MDTypography variant="body2" color="textSecondary" component="div" style={{ marginTop: 12 }}>
                                    Average Level Of Concern: {bioData.levelOfConcern}
                                </MDTypography>
                                <MDTypography variant="body2" color="textSecondary" component="div">
                                    Total Interventions: {bioData.totalInterventions}
                                </MDTypography>
                                <Grid container justifyContent="flex-end" spacing={1} style={{ marginTop: 12 }}>
                                    {bioData.email && (
                                        <Grid item>
                                            <Link href={`mailto:${bioData.email}`} target="_blank" rel="noopener noreferrer">
                                                <EmailIcon />
                                            </Link>
                                        </Grid>
                                    )}
                                    {bioData.instagram && (
                                        <Grid item>
                                            <Link href={bioData.instagram} target="_blank" rel="noopener noreferrer">
                                                <InstagramIcon />
                                            </Link>
                                        </Grid>
                                    )}
                                    {bioData.facebook && (
                                        <Grid item>
                                            <Link href={bioData.facebook} target="_blank" rel="noopener noreferrer">
                                                <FacebookIcon />
                                            </Link>
                                        </Grid>
                                    )}
                                    {bioData.twitter && (
                                        <Grid item>
                                            <Link href={bioData.twitter} target="_blank" rel="noopener noreferrer">
                                                <TwitterIcon />
                                            </Link>
                                        </Grid>
                                    )}
                                    {bioData.homePage && (
                                        <Grid item>
                                            <Link href={bioData.homePage} target="_blank" rel="noopener noreferrer">
                                                <LanguageIcon />
                                            </Link>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Tabs */}
                        <Grid container spacing={2} paddingTop={5} justifyContent={'flex-end'}>
                            <Grid item xs={12} justifyContent={'flex-end'}>
                                <Box sx={{ width: '50%', bgcolor: 'background.paper' }} justifyContent={'flex-end'}>
                                    <Tabs value={value} onChange={handleChange} justifyContent={'flex-end'}>
                                        <Tab label="Questions" value={'questions'} />
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
                                    <MDTypography variant="body2" style={{ marginLeft: 4 }}>Level Of Concern</MDTypography>
                                    {sortCriteria === 'score' && (sortOrder === 'asc' ? <SortIcon style={{ transform: 'rotate(180deg)', marginLeft: 4 }} /> : <SortIcon style={{ marginLeft: 4 }} />)}
                                </IconButton>
                            </Grid>

                            {/* Accordion */}
                            <Grid item xs={12}>
                                {sortedData.map((item, index) => (
                                    <Accordion key={index}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                                <Box flexGrow={1}>
                                                    <MDTypography variant="body2" fontWeight="bold" style={{ fontSize: 18, textAlign: 'left' }}>
                                                        {item.title}
                                                    </MDTypography>
                                                </Box>
                                                <Box display="flex" alignItems="center" style={{ minWidth: '150px', justifyContent: 'flex-end' }}>
                                                    <MDTypography variant="body2" color="textSecondary" style={{ marginRight: 8, fontSize: 12 }}>
                                                        {item.date}
                                                    </MDTypography>
                                                    <MDTypography variant="body2" color="textSecondary" style={{ fontSize: 12 }}>
                                                        LoC: {100 * (1 - item.score).toFixed(1)}
                                                    </MDTypography>
                                                </Box>
                                            </Box>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <MDTypography variant="body2" fontWeight="bold" style={{ textAlign: 'left' }}>
                                                Summary:
                                            </MDTypography>
                                            <MDTypography variant="body2" fontWeight="italic" style={{ textAlign: 'center', marginBottom: 18, marginTop: 8 }}>
                                                {item.summary}
                                            </MDTypography>
                                            {item.url && (
                                                <MDTypography variant="body2" fontWeight="italic" color="primary">
                                                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                                                        Intervention Source
                                                    </a>
                                                </MDTypography>
                                            )}
                                            <MDTypography variant="body2" fontWeight="bold" style={{ textAlign: 'left', marginTop: 18 }}>
                                                Fact Checking:
                                                </MDTypography>
                                            <MDTypography variant="body2" style={{ marginTop: 8 }}>
                                                {item.response}
                                            </MDTypography>
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

