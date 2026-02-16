import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Rating,
  IconButton,
  Backdrop,
  Fade,
  Paper,
  Chip,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Trip } from '../types';

interface MoreInfoModalProps {
  trip: Trip | null;
  onClose: () => void;
}

const MoreInfoModal: React.FC<MoreInfoModalProps> = ({ trip, onClose }) => {
  const [imageSrc, setImageSrc] = useState(trip?.image);

  useEffect(() => {
    setImageSrc(trip?.image);
  }, [trip]);

  const handleImageError = () => {
    setImageSrc('https://via.placeholder.com/500x250?text=Image+Not+Available');
  };

  if (!trip) return null;

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
          <Box sx={{ position: 'relative' }}>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 12,
                top: 12,
                color: (theme) => theme.palette.grey[500],
                backgroundColor: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,1)',
                }
              }}
            >
              <CloseIcon />
            </IconButton>
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
