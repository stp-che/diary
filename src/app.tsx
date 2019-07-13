import * as React from 'react';
import { NotesList, NoteEditor } from "./components/index"
import { Grid } from "@material-ui/core"
import { withStyles } from '@material-ui/styles';

import {Note} from "./models/Note"

const styles = {
  container: {
    height: "100%"
  }
};

class AppX extends React.Component<{classes: any}, {note: Note}> {
  constructor(){
    super();
    this.state = {note: new Note()};
    // this.state.note
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid container direction="row" alignItems="stretch" justify="flex-start" spacing={8} className={classes.container}>
        <Grid item><NotesList /></Grid>
        <Grid item xs={12} sm><NoteEditor note={this.state.note}/></Grid>
      </Grid>
    );
  }
}

export const App = withStyles(styles)(AppX)