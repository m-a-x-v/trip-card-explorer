import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Rating, Box, CardActions } from '@mui/material';
import type { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onMoreInfo: (trip: Trip) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onMoreInfo }) => {
  const [imageSrc, setImageSrc] = useState(trip.image);

  useEffect(() => {
    setImageSrc(trip.image);
  }, [trip.image]);

  const handleImageError = () => {
    setImageSrc('https://via.placeholder.com/400x200?text=Image+Not+Available');
  };

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="200"
          image={imageSrc}
          alt={trip.name}
          onError={handleImageError}
          sx={{
            transition: 'transform 0.4s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {trip.name}
          </Typography>
          <Rating name="read-only" value={trip.rating} readOnly precision={0.5} size="small" />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{
            height: 60,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            "-webkit-line-clamp": 3,
            "-webkit-box-orient": "vertical"
        }}>
          {trip.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button variant="contained" color="primary" onClick={() => onMoreInfo(trip)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default TripCard;
