import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Rating,
  Backdrop,
  Fade,
  Paper,
  Chip,
  Button
} from '@mui/material';
import type { Trip } from '../types';
import { FALLBACK_IMAGE, getImageOrFallback } from '../utils/imageFallback';

interface MoreInfoModalProps {
  trip: Trip | null;
  onClose: () => void;
}

const MoreInfoModal: React.FC<MoreInfoModalProps> = ({ trip, onClose }) => {
  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    if (target.dataset.fallbackApplied === 'true') return;
    target.dataset.fallbackApplied = 'true';
    target.src = FALLBACK_IMAGE;
  };

  if (!trip) return null;

  const imageSrc = getImageOrFallback(trip.image, 'modal');

  return (
    <Modal
      open={!!trip}
      onClose={onClose}
      aria-labelledby="trip-details-modal-title"
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backdropFilter: 'blur(5px)',
            backgroundColor: 'rgba(0,0,0,0.4)'
          }
        },
      }}
    >
      <Fade in={!!trip}>
        <Paper sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {
            xs: '90%',
            sm: '70%',
            md: '500px'
          },
          maxWidth: '500px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '16px',
          boxShadow: 24,
          p: 0,
          bgcolor: 'background.paper',
        }}>
          <Box>
            <img 
              src={imageSrc} 
              alt={trip.name} 
              onError={handleImageError}
              style={{ width: '100%', height: '250px', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }} 
            />
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography id="trip-details-modal-title" variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                  {trip.name}
                </Typography>
                <Chip 
                    label={<Box sx={{display: 'flex', alignItems: 'center'}}><Rating name="read-only" value={trip.rating} readOnly precision={0.5} size="small" sx={{mr: 0.5}}/> {trip.rating.toFixed(1)}</Box>}
                    sx={{backgroundColor: 'primary.main', color: 'white', fontWeight: 'bold'}}
                />
              </Box>
              <Typography id="trip-details-modal-description" sx={{ mt: 2, color: 'text.secondary' }}>
                {trip.long_description}
              </Typography>
              <Box sx={{mt: 3, textAlign: 'right'}}>
                <Button onClick={onClose} variant="outlined">Close</Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default MoreInfoModal;
