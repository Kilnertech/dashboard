import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, Avatar, Chip } from '@mui/material';
import { Facebook, Twitter, Instagram, Email, Public } from '@mui/icons-material';

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

const FeedItem = ({ loading, data }) => {
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {data.map((item, index) => (
        <Card key={index} sx={{ mb: 2, p: 2, display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* Avatar Image */}
              {item.imgLink ? (
                <Avatar alt={item.name} src={item.imgLink} sx={{ width: 56, height: 56, mr: 2 }} />
              ) : (
                <Avatar sx={{ width: 56, height: 56, mr: 2 }}>{item.name ? item.name[0] : '?'}</Avatar>
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
                    color={getDocumentColor(item.typeDocument)}
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
            </Box>
          </CardContent>
          <CardContent>
            {/* Title linked to URL */}
            {item.title && item.url && (
              <Typography variant="h4" gutterBottom>
                <a href={replaceXmlWithHtml(item.url)} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
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
              Level of Concern: {parseInt(item.levelOfConcern) || 'N/A'}
            </Typography>
            {item.url && (
              <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
                <a href={replaceXmlWithHtml(item.url)} target="_blank" rel="noopener noreferrer">
                  Original Source
                </a>
              </Typography>
            )}
            {/* Social Media and Contact */}
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              {item.email && (
                <IconButton href={`mailto:${reverseString(item.email)}`} aria-label="email">
                  <Email />
                </IconButton>
              )}
              {item.facebook && (
                <IconButton href={item.facebook} aria-label="facebook" target="_blank" rel="noopener">
                  <Facebook />
                </IconButton>
              )}
              {item.twitter && (
                <IconButton href={item.twitter} aria-label="twitter" target="_blank" rel="noopener">
                  <Twitter />
                </IconButton>
              )}
              {item.instagram && (
                <IconButton href={item.instagram} aria-label="instagram" target="_blank" rel="noopener">
                  <Instagram />
                </IconButton>
              )}
              {item.homePage && (
                <IconButton href={item.homePage} aria-label="homepage" target="_blank" rel="noopener">
                  <Public />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default FeedItem;
