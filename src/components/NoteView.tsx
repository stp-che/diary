import * as React from 'react';
import {Note} from "../models/Note"
import NoteService from "../services/NoteService"

// import { withStyles } from '@material-ui/styles';
import { Typography, Button, Grid } from "@material-ui/core"

import NoteEditor from "./NoteEditor"

type Props = {note: Note};

class NoteView extends React.Component<Props, {edit: boolean}> {
  constructor(props: Props){
    super(props);
    this.state = {edit: this.props.note.id === undefined};
  }

  componentDidUpdate(prevProps) {
    if (this.props.note.id !== prevProps.note.id) {
      this.setState({edit: this.props.note.id === undefined});
    }
  }

  edit = () => this.setState({edit: true});

  render() {
    const {note} = this.props;
    if (this.state.edit) {
      return <NoteEditor note={note}/>
    } else {
      return (
        <div>
          <Button variant="contained" onClick={this.edit}>Edit</Button>
          <Typography variant="h5">{note.title}</Typography>
          <Typography variant="subtitle1">{note.date.toLocaleDateString()}</Typography>
          <Typography variant="body1">{note.text}</Typography>
        </div>
      )
    }
  }
}

export default NoteView;