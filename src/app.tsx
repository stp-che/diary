import * as React from 'react';
import { NotesList, NoteEditor } from "./components/index"
import { Grid } from "@material-ui/core"
import { withStyles } from '@material-ui/styles';

import {Note} from "./models/Note"
import NoteService from "./services/NoteService"

const styles = {
  container: {
    height: "100%"
  }
};

class AppX extends React.Component<{classes: any}, {note?: Note, notes?: Note[]}> {
  constructor(){
    super();
    let note = new Note({date: new Date(), title: "", text: ""});
    this.state = {note, notes: []};
  }

  componentDidMount(){
    const notes = NoteService.getNotes();
    this.setState({notes});
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid container direction="row" alignItems="stretch" justify="flex-start" spacing={4} className={classes.container}>
        <Grid item xs={3}><NotesList notes={this.state.notes}/></Grid>
        <Grid item xs={9}><NoteEditor note={this.state.note}/></Grid>
      </Grid>
    );
  }
}

export const App = withStyles(styles)(AppX)