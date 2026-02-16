import React from 'react';
import { Box } from '@mui/material';
import TripCard from './TripCard';
import type { Trip } from '../types';

interface TripListProps {
  trips: Trip[];
  onMoreInfo: (trip: Trip) => void;
}

const TripList: React.FC<TripListProps> = ({ trips, onMoreInfo }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
      }}
    >
      {trips.map(trip => (
        <Box key={trip.id} sx={{ flex: '1 1 300px', maxWidth: '345px' }}>
          <TripCard trip={trip} onMoreInfo={onMoreInfo} />
        </Box>
      ))}
    </Box>
  );
};

export default TripList;
