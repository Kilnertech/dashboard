import { buildURL, rootAPI, callAPI } from 'api/callAPI';
import React, { useState, useEffect, useRef } from 'react';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import {
  Box, TextField, Typography, Pagination, IconButton, Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SortIcon from '@mui/icons-material/Sort';
import PromptsQuerySelectors from 'customizedComponents/PromptQuerySelectors';
import FeedItem from './FeedItem';

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const cache = useRef({});
  const [feedData, setFeedData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [filterMP, setFilterMP] = useState('');
  const [filterParty, setFilterParty] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchFeed = async (queryID) => {
    setLoading(true);
    let feedData;
    if (!cache.current[queryID]) {
      try {
        const data = await callAPI(buildURL(rootAPI, `user/feed?queryID=${queryID}`), "GET");
        feedData = await data.response;
        console.log(feedData);
        cache.current[queryID] = feedData;
      } catch (error) {
        console.error("Error fetching data:", error);
        feedData = []; // Provide a default value in case of an error
      } finally {
        setLoading(false);
      }
    } else {
      feedData = cache.current[queryID];
    }
    setFeedData(feedData);
    setLoading(false);
  };

  const filteredData = (feedData || []).filter((item) => {
    const itemDate = new Date(item.date || '');
    const startDate = new Date(filterStartDate);
    const endDate = new Date(filterEndDate);
    const dateInRange = (!filterStartDate || itemDate >= startDate) && (!filterEndDate || itemDate <= endDate);

    return (
      dateInRange &&
      (item.name || '').toLowerCase().includes(filterMP.toLowerCase()) &&
      (item.party || '').toLowerCase().includes(filterParty.toLowerCase()) &&
      (item.group || '').toLowerCase().includes(filterGroup.toLowerCase())
    );
  });

  useEffect(() => {
    let data = [...feedData];

    if (data.length > 0) {
      if (filterStartDate && filterEndDate) {
        data = data.filter(item =>
          new Date(item.date || '') >= new Date(filterStartDate) &&
          new Date(item.date || '') <= new Date(filterEndDate)
        );
      }

      if (filterMP) {
        data = data.filter(item => (item.name || '').toLowerCase().includes(filterMP.toLowerCase()));
      }

      if (filterParty) {
        data = data.filter(item => (item.party || '').toLowerCase().includes(filterParty.toLowerCase()));
      }

      if (filterGroup) {
        data = data.filter(item => (item.group || '').toLowerCase().includes(filterGroup.toLowerCase()));
      }

      switch (sortCriteria) {
        case 'date':
          data.sort((a, b) => sortOrder === 'asc' ? new Date(a.date || '') - new Date(b.date || '') : new Date(b.date || '') - new Date(a.date || ''));
          break;
        case 'levelOfConcern':
          data.sort((a, b) => sortOrder === 'asc' ? (a.levelOfConcern || 0) - (b.levelOfConcern || 0) : (b.levelOfConcern || 0) - (a.levelOfConcern || 0));
          break;
        default:
          break;
      }

      const startIndex = (currentPage - 1) * itemsPerPage;
      setDisplayedData(data.slice(startIndex, startIndex + itemsPerPage));
    }
  }, [feedData, sortCriteria, sortOrder, filterStartDate, filterEndDate, filterMP, filterParty, filterGroup, currentPage]);

  const handleSort = (criteria) => {
    if (sortCriteria === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortOrder('asc');
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <PromptsQuerySelectors onQueryUpdate={fetchFeed} />
      <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
        {/* Filters Dropdown */}
        <Box sx={{ mb: 2 }}>
          <IconButton onClick={() => setFilterOpen(!filterOpen)}>
            {filterOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            <Typography variant="h6" sx={{ ml: 1 }}>Filters</Typography>
          </IconButton>
          <Collapse in={filterOpen}>
            <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
              <TextField
                label="Start Date"
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="End Date"
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="MP"
                type="text"
                value={filterMP}
                onChange={(e) => setFilterMP(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Party"
                type="text"
                value={filterParty}
                onChange={(e) => setFilterParty(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Group"
                type="text"
                value={filterGroup}
                onChange={(e) => setFilterGroup(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Box>
          </Collapse>
        </Box>

        {/* Sorting */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" sx={{ mr: 1 }}>Sort by:</Typography>
          <IconButton onClick={() => handleSort('date')}>
            <Typography variant="body2" sx={{ mr: 1 }}>Date</Typography>
            {sortCriteria === 'date' && (sortOrder === 'asc' ? <SortIcon sx={{ transform: 'rotate(180deg)' }} /> : <SortIcon />)}
          </IconButton>
          <IconButton onClick={() => handleSort('levelOfConcern')}>
            <Typography variant="body2" sx={{ mr: 1 }}>Level of Concern</Typography>
            {sortCriteria === 'levelOfConcern' && (sortOrder === 'asc' ? <SortIcon sx={{ transform: 'rotate(180deg)' }} /> : <SortIcon />)}
          </IconButton>
        </Box>

        {/* Feed Data */}
        <FeedItem loading={loading} data={displayedData} />

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={currentPage}
            onChange={(e, value) => setCurrentPage(value)}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Feed;
