import * as React from 'react';
import {Note} from "../models/Note";
// import { Link } from 'react-router-dom';
import {List, ListItem, ListItemText} from '@material-ui/core';

type Props = {notes: Note[], selectedNote?: Note, selectNote: Function}

const NotesList = ({notes, selectedNote, selectNote}: Props) => (
  <List style={{maxHeight: '100%', overflow: 'auto'}}>
    {notes.map((note: Note) => (
      <React.Fragment key={note.id}>
        <ListItem divider onClick={() => selectNote(note)} selected={selectedNote && selectedNote.id == note.id}>
          <ListItemText primary={note.title} secondary={note.date.toLocaleDateString()}/>
        </ListItem>
      </React.Fragment>
    ))}
  </List>
)

export default NotesList;