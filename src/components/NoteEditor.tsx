import * as React from 'react';
import {Note} from "../models/Note"
import NoteService from "../services/NoteService"

import { withStyles } from '@material-ui/styles';
import { TextField, Button, Grid } from "@material-ui/core"

import * as MomentUtils from '@date-io/moment';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';



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

class NoteEditor extends React.Component<Props, {note: Note}> {
  constructor(props: Props){
    super(props);
    this.state = {
      note: this.props.note
    };
  }

  onChange = (e: any) => {
    this.state.note[e.target.name] = e.target.value;
    this.setState({note: this.state.note});
  };

  onDateChange = (moment: any) => {
    this.state.note.date = moment.toDate();
    this.setState({note: this.state.note});
  };

  saveNote = () => NoteService.saveNote(this.state.note);

  render() {
    const {classes} = this.props;
    const {note} = this.state;

    return(
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container direction="column" alignItems="stretch" alignContent="stretch" justify="flex-start" spacing={1} className={classes.container}>
          <Grid item><Button variant="contained" onClick={this.saveNote}>Save</Button></Grid>
          <Grid item>
            <Grid container spacing={1}>
              <Grid item xs={9}><TextField name="title" value={note.title} onChange={this.onChange} fullWidth/></Grid>
              <Grid item xs={3}><KeyboardDatePicker name="date" value={note.date} onChange={this.onDateChange} fullWidth/></Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.textareaContainer}>
            <textarea name="text" className={classes.textarea} value={note.text} onChange={this.onChange}/>
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    )
  }
}

export default withStyles(styles)(NoteEditor);