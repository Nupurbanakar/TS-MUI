import React, { useState } from 'react';
import { Fab, Modal, Box, TextField, Button, Card, CardContent, Divider, IconButton,Typography, Tooltip} from '@mui/material';
import addNote from '../assets/plus.png';
import deleteNote from '../assets/delete-note.png';
import pinNote from '../assets/pin.png'
import plus from '../assets/plus-icon.png';
import '../styles/NoteKeeper.css';
import ToggleButton from './ToggleButton';

const NoteKeeper: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState<{ text: string; pinned: boolean }[]>([]);

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
    if (note.trim() === '') return; 
    const updatedNotes = [...notes];
    const pinnedNotesCount = updatedNotes.filter((note) => note.pinned).length;
    if (pinnedNotesCount >= 3) {
      const lastPinnedNoteIndex = updatedNotes.findIndex((note) => note.pinned);
      updatedNotes.splice(lastPinnedNoteIndex + 1, 0, { text: note, pinned: false });
      updatedNotes.pop(); 
    } else {
      updatedNotes.unshift({ text: note, pinned: false });
    }
    setNotes(updatedNotes);
    setNote('');
    handleClose();
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  const handlePinNote = (index: number) => {
  const updatedNotes = [...notes];
  const noteToPin = updatedNotes.splice(index, 1)[0];  
  if (noteToPin.pinned) {
    noteToPin.pinned = false;
    updatedNotes.push(noteToPin); 
  } else {
    const pinnedNotesCount = updatedNotes.filter((note) => note.pinned).length;
    if (pinnedNotesCount >= 3) {
      const oldestPinnedNoteIndex = updatedNotes.findIndex((note) => note.pinned);
      updatedNotes[oldestPinnedNoteIndex].pinned = false; 
      updatedNotes.splice(oldestPinnedNoteIndex, 1, noteToPin); 
    } else {
      noteToPin.pinned = true;
      updatedNotes.unshift(noteToPin);
    }
  }
  setNotes(updatedNotes);
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
    {notes.map((note, index) => (
      <div key={index}>
        <Card className='note-card'>
          <CardContent>
            <Typography variant="body1" component="p">
            {note.text}
            </Typography>
          </CardContent>
          <Divider variant="middle"  />
          <div className="card-icons">
          <Tooltip title="Delete Note">
            <IconButton aria-label="delete" onClick={() => handleDeleteNote(index)}>
              <img src={deleteNote} alt='del-note' onClick={() => handleDeleteNote(index)} className='img'></img>
            </IconButton>
          </Tooltip>
          <Tooltip title="Pin Note">
            <IconButton aria-label="favorite">
            <img src={pinNote} alt='pin-note' className='img' onClick={() => handlePinNote(index)}></img>
            </IconButton>
          </Tooltip>
          {note.pinned && <Typography variant="caption" className="pinned-label">Pinned</Typography>}
          </div>
        </Card>
      </div>
    ))}
    </>
  );
};

export default NoteKeeper;
