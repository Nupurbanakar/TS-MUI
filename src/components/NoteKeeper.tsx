import React, { useState } from 'react';
import { Fab, Modal, Box, TextField, Button } from '@mui/material';
import addNote from '../assets/plus.png'
import plus from '../assets/plus-icon.png'
import '../styles/NoteKeeper.css'
import ToggleButton from '../components/ToggleButton'

const NoteKeeper: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleSaveNote = () => {
    console.log('Note saved:', note);
    handleClose();
  };

  return (
    <>
    <h1>Add Note</h1>
    <div className='add-icon'>
      <Fab color="primary" aria-label="add" onClick={handleOpen} >
        <img src={addNote} alt='add-note' className='img'></img>
      </Fab>
      <Modal open={open} onClose={handleClose}>
        <Box className='modal-box'>
          <ToggleButton />
          <TextField
            id="note"
            label="Enter your note"
            multiline
            minRows={3}
            maxRows={10}
            value={note}
            onChange={handleNoteChange}
            fullWidth
            className='textbox'
          />
          <Button variant="contained" onClick={handleSaveNote} className='save-btn'>
          <img src={plus} alt='add-note' className='plus'></img>
          <span className='save-text'>Save</span>
          </Button>
        </Box>
      </Modal>
    </div>
    </>
  );
};

export default NoteKeeper;
