import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, SnackbarContent } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from '../../store/slices/snackbarSlice';

export function SuccessSnackbar({}) {  
  const dispatch = useDispatch();
  const open = useSelector((state) => state.snackbar.openSuccessSnackBar);
  const message = useSelector((state) => state.snackbar.snackBarMessage);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"right" }}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export function ErrorSnackbar({ }) {  
  const dispatch = useDispatch();
  const open = useSelector((state) => state.snackbar.openErrorSnackBar);
  const message = useSelector((state) => state.snackbar.snackBarMessage);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"right" }}>
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}


export function NormalSnackbar({ }) {  
  const dispatch = useDispatch();
  const open = useSelector((state) => state.snackbar.openNormalSnackBar);
  const message = useSelector((state) => state.snackbar.snackBarMessage);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar());
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"right" }}>
      <SnackbarContent
        sx={{
          mb: 2,
          backgroundColor: "#ffffff",
          color: "#000000",
        }}
        message={message}
        action={action}
      />
    </Snackbar>
  );
}
