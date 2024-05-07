import React, { useState } from 'react';
import {Fab} from '@mui/material';
import addNote from './assets/plus.png'
import '../src/index.css'

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
    </div>
    </>
  );
};

export default NoteKeeper;
