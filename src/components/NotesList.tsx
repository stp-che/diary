import * as React from 'react';
import {Note} from "../models/Note";
import {List, ListItem, ListItemText, Divider} from '@material-ui/core';

const NotesList = (props: {notes: Note[]}) => (
  <List>
    {props.notes.map((note: Note) => (
      <React.Fragment key={note.id}>
        <ListItem>
          <ListItemText primary={note.title} secondary={note.date.toLocaleDateString()}/>
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    ))}
  </List>
)

export default NotesList;