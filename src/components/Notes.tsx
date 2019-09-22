import * as React from 'react';
import { Grid } from "@material-ui/core"
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

class Notes extends React.Component<{classes: any}, {note?: Note, notes?: Note[]}> {
  constructor(){
    super();
    let note = new Note({date: new Date(), title: "", text: ""});
    this.state = {note, notes: []};
  }

  componentDidMount(){
    const notes = NoteService.getNotes();
    this.setState({notes});
  }

  selectNote = (note: Note) => {
    this.setState({note});
  }

  render() {
    const {classes} = this.props;
    const {note, notes} = this.state;
    return (
      <Grid container direction="row" alignItems="stretch" justify="flex-start" spacing={4} className={classes.container}>
        <Grid item xs={3}><NotesList notes={notes} selectNote={this.selectNote} selectedNote={note}/></Grid>
        <Grid item xs={9}>
          <NoteView note={note} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Notes);