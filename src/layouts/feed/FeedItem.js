import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Avatar, Chip, List, ListItem, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, Email, Public } from '@mui/icons-material';
import { styled } from '@mui/system';

const DynamicButton = styled(Button)(({ theme, color }) => ({
  backgroundColor: theme.palette[color]?.main || theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette[color]?.dark || theme.palette.primary.dark,
  },
}));

const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

const reverseString = (str) => {
  return str.split('').reverse().join('');
};

const replaceXmlWithHtml = (url) => {
  if (url && url.endsWith('.xml')) {
    return url.slice(0, -4) + '.html';
  }
  return url;
};

const getDocumentColor = (type) => {
  switch (type) {
    case 'questions':
      return 'primary';
    case 'debates':
      return 'secondary';
    case 'explanations':
      return 'success';
    default:
      return 'default';
  }
};

const parseQuestions = (questionsString) => {
  try {
    let cleanedString = questionsString
      .replace(/^\[|\]$/g, '')
      .replace(/'/g, '"');
    const parsed = JSON.parse(`[${cleanedString}]`);
    if (Array.isArray(parsed)) {
      return parsed;
    } else {
      throw new Error('Parsed data is not an array');
    }
  } catch (error) {
    console.error('Error parsing questions:', error);
    return [];
  }
};

const FeedItem = ({ loading, data, filterMP, setFilterMP, setCurrentPage }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const handleExpandClick = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const handleAvatarClick = (name) => {
    if (filterMP.toLowerCase() === name.toLowerCase()) {
      setFilterMP(''); // Deselect if already selected
    } else {
      setFilterMP(name); // Set the filter to the selected MP
      setCurrentPage(1);
    }
  };

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {data.map((item, index) => {
        const documentColor = getDocumentColor(item.typeDocument);
        const isSelected = filterMP === item.name;

        return (
          <Card key={index} sx={{ mb: 2, p: 2, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Avatar Image with click handling */}
                {item.imgLink ? (
                  <Avatar
                    alt={item.name}
                    src={item.imgLink}
                    onClick={() => handleAvatarClick(item.name)}
                    sx={{
                      width: 120,
                      height: 120,
                      mr: 2,
                      border: isSelected ? '3px solid #1976d2' : 'none',
                      cursor: 'pointer',
                    }}
                  />
                ) : (
                  <Avatar
                    onClick={() => handleAvatarClick(item.name)}
                    sx={{
                      width: 120,
                      height: 120,
                      mr: 2,
                      border: isSelected ? '3px solid #1976d2' : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {item.name ? item.name[0] : '?'}
                  </Avatar>
                )}
                {/* Title and MP Name */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {item.name ? toTitleCase(item.name) : 'No Name'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.date || 'No Date'}
                  </Typography>
                  {item.typeDocument && (
                    <Chip
                      label={item.typeDocument}
                      color={documentColor}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  )}
                </Box>
              </Box>
              {/* Party and Group */}
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="textSecondary">
                  {item.party || 'No Party'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.group || 'No Group'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.country || 'No Country'}
                </Typography>
                {item.email && (
                  <IconButton href={`mailto:${reverseString(item.email)}`} aria-label="email">
                    <Email />
                  </IconButton>
                )}
                {item.facebook && (
                  <IconButton href={item.facebook} aria-label="facebook" target="_blank" rel="noopener noreferrer">
                    <Facebook />
                  </IconButton>
                )}
                {item.twitter && (
                  <IconButton href={item.twitter} aria-label="twitter" target="_blank" rel="noopener noreferrer">
                    <Twitter />
                  </IconButton>
                )}
                {item.instagram && (
                  <IconButton href={item.instagram} aria-label="instagram" target="_blank" rel="noopener noreferrer">
                    <Instagram />
                  </IconButton>
                )}
                {item.homePage && (
                  <IconButton href={item.homePage} aria-label="homepage" target="_blank" rel="noopener noreferrer">
                    <Public />
                  </IconButton>
                )}
              </Box>
            </CardContent>
            
            <CardContent>
              {/* Title linked to URL */}
              {item.title && (
                <Typography variant="h4" gutterBottom>
                  {item.url ? (
                    <a
                      href={replaceXmlWithHtml(item.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'black', textDecoration: 'none' }}
                    >
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </Typography>
              )}
              <Typography variant="subtitle2" gutterBottom>
                Summary
              </Typography>
              <Typography variant="body2" paragraph>
                {item.summary || 'No Summary'}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Fact Checking
              </Typography>
              <Typography variant="body2" paragraph sx={{ fontWeight: 'bold' }}>
                {item.response || 'No Response'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Level of Concern: {Math.floor(item.levelOfConcern)}
              </Typography>

              {/* Conditional Rendering for Questions, Explanations, and Debates */}
              {item.typeDocument && (
                <Box sx={{ mt: 2 }}>
                  {item.typeDocument === 'questions' && (
                    <>
                      <DynamicButton
                        variant="contained"
                        color={documentColor}
                        onClick={() => handleExpandClick(index)}
                        sx={{ mb: 1 }}
                      >
                        {expandedItem === index ? 'Hide Details' : 'Further Details'}
                      </DynamicButton>
                      {expandedItem === index && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Intro
                          </Typography>
                          <Typography variant="body2" paragraph>
                            {item.intro || 'No Intro'}
                          </Typography>
                          {item.questions && item.questions !== '[]' ? (
                            <>
                              <Typography variant="subtitle1" gutterBottom>
                                Questions
                              </Typography>
                              <List>
                                {parseQuestions(item.questions).map((question, idx) => (
                                  <ListItem key={idx}>
                                    <Typography variant="body2" paragraph>
                                      {question}
                                    </Typography>
                                  </ListItem>
                                ))}
                              </List>
                            </>
                          ) : null}

                        </Box>
                      )}
                    </>
                  )}

                  {item.typeDocument === 'explanations' && (
                    <Box sx={{ mt: 1 }}>
                      <DynamicButton
                        variant="contained"
                        color={documentColor}
                        onClick={() => handleExpandClick(index)}
                        sx={{ mb: 1 }}
                      >
                        Further Details
                      </DynamicButton>
                      {expandedItem === index && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            Explanation of Vote
                          </Typography>
                          <Typography variant="body2" paragraph>
                            {item.textTranslated || 'No Explanation'}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}

                  {item.typeDocument === 'debates' && (
                    <Box sx={{ mt: 1 }}>
                      <DynamicButton
                        variant="contained"
                        color={documentColor}
                        onClick={() => handleExpandClick(index)}
                        sx={{ mb: 1 }}
                      >
                        Further Details
                      </DynamicButton>
                      {expandedItem === index && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="h6" gutterBottom>
                            Intervention
                          </Typography>
                          <Typography variant="body2" paragraph>
                            {item.textTranslated || 'No Debate Text'}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              )}

            </CardContent>
            {/* Original Source Link at the end of the card */}
            {item.url && (
              <CardContent>
                <Typography variant="body2" color="primary" sx={{ textAlign: 'center' }}>
                  <a href={replaceXmlWithHtml(item.url)} target="_blank" rel="noopener noreferrer">
                    Original Source
                  </a>
                </Typography>
              </CardContent>
            )}
          </Card>
        );
      })}
    </Box>
  );
};

export default FeedItem;
