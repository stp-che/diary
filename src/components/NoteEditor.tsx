import * as React from 'react';
import {Note} from "../models/Note"
import NoteService from "../services/NoteService"

import { withStyles } from '@material-ui/styles';
import { TextField, Button, Grid } from "@material-ui/core"

type Props = {note: Note, classes: any};

const styles = {
  container: {
    height: "100%"
  },
  textareaContainer: {
    flexGrow: 1,
    display: "flex"
  },
  textarea: {
    border: "1px solid #e0e0e0",
    width: "100%",
    flexGrow: 1
  }
};

class NotesEditor extends React.Component<Props, {note: Note}> {
  constructor(props){
    super(props);
    this.state = {note: this.props.note};
  }

  onChange = (e) => {
    this.state.note.text = e.target.value;
    this.setState({note: this.state.note});
  };

  saveNote = () => NoteService.saveNote(this.state.note);

  render() {
    const {classes} = this.props;
    const {note} = this.state;

    return(
      <Grid container direction="column" alignItems="stretch" alignContent="stretch" justify="flex-start" spacing={8} className={classes.container}>
        <Grid item><Button variant="outlined" onClick={this.saveNote}>Save</Button></Grid>
        <Grid item className={classes.textareaContainer}>
          <textarea className={classes.textarea} value={note.text} onChange={this.onChange}/>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(NotesEditor);