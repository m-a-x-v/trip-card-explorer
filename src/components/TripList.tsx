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
    <Box className="trip-grid">
      {trips.map(trip => (
        <Box key={trip.id} className="trip-grid-item">
          <TripCard trip={trip} onMoreInfo={onMoreInfo} />
        </Box>
      ))}
    </Box>
  );
};

export default React.memo(TripList);
