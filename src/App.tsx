import React, { useState, useEffect, useMemo, useCallback, useDeferredValue } from 'react';
import { Box, Typography, TextField, Switch, FormControlLabel, CircularProgress, Alert } from '@mui/material';
import TripList from './components/TripList';
import MoreInfoModal from './components/MoreInfoModal';
import type { Trip } from './types';

const DATA_URL = `${import.meta.env.BASE_URL}data.json`;

const isTrip = (value: unknown): value is Trip => {
  if (typeof value !== 'object' || value === null) return false;
  const trip = value as Record<string, unknown>;
  return (
    typeof trip.id === 'number' &&
    typeof trip.name === 'string' &&
    typeof trip.image === 'string' &&
    typeof trip.short_description === 'string' &&
    typeof trip.long_description === 'string' &&
    typeof trip.rating === 'number'
  );
};

const parseTripPayload = (payload: unknown): Trip[] | null => {
  const tripArray = Array.isArray(payload)
    ? payload
    : typeof payload === 'object' && payload !== null && Array.isArray((payload as { trips?: unknown }).trips)
      ? (payload as { trips: unknown[] }).trips
      : null;

  if (!tripArray) return null;
  return tripArray.every(isTrip) ? tripArray : null;
};

const App: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortByRating, setSortByRating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    let isActive = true;

    const loadTrips = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(DATA_URL, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload: unknown = await response.json();
        const parsedTrips = parseTripPayload(payload);
        if (!parsedTrips) {
          throw new Error('Invalid trip payload');
        }

        if (isActive) {
          setTrips(parsedTrips);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        if (isActive) {
          setError('Failed to fetch trip data.');
          setTrips([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void loadTrips();

    return () => {
      isActive = false;
      abortController.abort();
    };
  }, []);

  const normalizedSearchTerm = useMemo(() => searchTerm.trim().toLowerCase(), [searchTerm]);
  const deferredSearchTerm = useDeferredValue(normalizedSearchTerm);

  const filteredTrips = useMemo(() => {
    let currentTrips = deferredSearchTerm
      ? trips.filter(trip => trip.name.toLowerCase().includes(deferredSearchTerm))
      : trips;

    if (sortByRating) {
      currentTrips = [...currentTrips].sort((a, b) => b.rating - a.rating);
    }

    return currentTrips;
  }, [trips, deferredSearchTerm, sortByRating]);

  const hasNoTrips = !loading && !error && trips.length === 0;
  const hasNoResults = !loading && !error && trips.length > 0 && filteredTrips.length === 0;

  const handleMoreInfo = useCallback((trip: Trip) => {
    setSelectedTrip(trip);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTrip(null);
  }, []);

  return (
    <Box className="app-shell">
      <Typography variant="h2" align="center" gutterBottom className="page-title" sx={{ color: 'text.primary' }}>
        Explore Your Next Adventure
      </Typography>
      
      <Box className="controls-bar">
        <TextField
          className="search-field"
          label="Search destinations..."
          variant="outlined"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <FormControlLabel
          className="sort-toggle"
          control={<Switch checked={sortByRating} onChange={e => setSortByRating(e.target.checked)} color="primary" />}
          label="Sort by Rating"
        />
      </Box>

      {loading ? (
        <Box className="loading-state">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box className="error-state">
          <Alert severity="error">{error}</Alert>
        </Box>
      ) : hasNoTrips ? (
        <Box className="no-results-state">
          <Alert severity="info">No trip data available.</Alert>
        </Box>
      ) : hasNoResults ? (
        <Box className="no-results-state">
          <Alert severity="info">No locations match your search.</Alert>
        </Box>
      ) : (
        <TripList trips={filteredTrips} onMoreInfo={handleMoreInfo} />
      )}
    
      <MoreInfoModal trip={selectedTrip} onClose={handleCloseModal} />
    </Box>
  );
};

export default App;
