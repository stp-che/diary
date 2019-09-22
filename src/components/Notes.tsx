import * as React from 'react';
import { Grid, Button } from "@material-ui/core"
import { withStyles } from '@material-ui/styles';
import { Route, Link, Switch, Redirect } from "react-router-dom";

import {Note} from "../models/Note"
import NoteService from "../services/NoteService"

import NotesList from "./NotesList"
import NoteView from "./NoteView"

const styles = {
  container: {
    height: "100%"
  }
};

const initNewNote = () => new Note({date: new Date(), title: "", text: ""});

class Notes extends React.Component<{classes: any}, {note?: Note, notes?: Note[]}> {
  constructor(props){
    super(props);
    this.state = {note: initNewNote(), notes: []};
  }

  componentDidMount(){
    this.setState({notes: NoteService.getNotes()});
  }

  selectNote = (note: Note) => {
    this.setState({note});
  }

  afterSave = (note: Note) => {
    this.setState({note, notes: NoteService.getNotes()});
  }

  newNote = () => this.setState({note: initNewNote()});

  render() {
    const {classes} = this.props;
    const {note, notes} = this.state;
    return (
      <Grid container direction="row" alignItems="stretch" justify="flex-start" spacing={4} className={classes.container}>
        <Grid item xs={3}>
          <Button variant="contained" onClick={this.newNote}>New</Button>
          <NotesList notes={notes} selectNote={this.selectNote} selectedNote={note}/>
        </Grid>
        <Grid item xs={9}>
          <NoteView note={note} afterSave={this.afterSave} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Notes);