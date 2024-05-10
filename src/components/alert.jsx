import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
export default function Alert({ message, openSnack }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(openSnack);
  }, [openSnack]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar 
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={open}
      autoHideDuration={3000} // Snackbar will be shown for 5 seconds
      onClose={handleClose}
      message={message}
    />
    
  );
}
