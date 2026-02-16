import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Switch, FormControlLabel, CircularProgress, Alert } from '@mui/material';
import TripList from './components/TripList';
import MoreInfoModal from './components/MoreInfoModal';
import type { Trip } from './types';
import tripData from './data.json';

const App: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByRating, setSortByRating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setTimeout(() => {
        setTrips(tripData.trips);
        setFilteredTrips(tripData.trips);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch trip data.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let currentTrips = [...trips];

    if (searchTerm) {
      currentTrips = currentTrips.filter(trip =>
        trip.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortByRating) {
      currentTrips.sort((a, b) => b.rating - a.rating);
    }

    setFilteredTrips(currentTrips);
  }, [searchTerm, sortByRating, trips]);

  const handleMoreInfo = (trip: Trip) => {
    setSelectedTrip(trip);
  };

  const handleCloseModal = () => {
    setSelectedTrip(null);
  };

  return (
    <Box>
      <Typography variant="h2" align="center" gutterBottom sx={{ mb: 4, color: 'text.primary' }}>
        Explore Your Next Adventure
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 2, 
        mb: 5,
        p: 2,
        backgroundColor: 'background.paper',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        maxWidth: '800px',
        mx: 'auto'
      }}>
        <TextField
          label="Search destinations..."
          variant="outlined"
          sx={{ flexGrow: 1 }}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <FormControlLabel
          control={<Switch checked={sortByRating} onChange={e => setSortByRating(e.target.checked)} color="primary" />}
          label="Sort by Rating"
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error" sx={{ my: 5 }}>{error}</Alert>
      ) : (
        <TripList trips={filteredTrips} onMoreInfo={handleMoreInfo} />
      )}
    
      <MoreInfoModal trip={selectedTrip} onClose={handleCloseModal} />
    </Box>
  );
};

export default App;
