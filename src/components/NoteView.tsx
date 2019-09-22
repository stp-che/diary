import * as React from 'react';
import {Note} from "../models/Note"
import NoteService from "../services/NoteService"

// import { withStyles } from '@material-ui/styles';
import { Typography, Button, Grid } from "@material-ui/core"

import NoteEditor from "./NoteEditor"

type Props = {note: Note, afterSave?: Function};

class NoteView extends React.Component<Props, {edit: boolean}> {
  constructor(props: Props){
    super(props);
    this.state = {edit: this.props.note.id === undefined};
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.note.id !== prevProps.note.id) {
      this.setState({edit: this.props.note.id === undefined});
    }
  }

  edit = () => this.setState({edit: true});

  afterSave = (note: Note) => {
    this.setState({edit: false});
    this.props.afterSave(note);
  }

  render() {
    const {note} = this.props;
    if (this.state.edit) {
      return <NoteEditor note={note} afterSave={this.afterSave} />
    } else {
      return (
        <div>
          <Button variant="contained" onClick={this.edit}>Edit</Button>
          <Typography variant="h5">{note.title}</Typography>
          <Typography variant="subtitle1">{note.date.toLocaleDateString()}</Typography>
          {
            (note.text || "").split(/\n/).map((s, i) => <Typography variant="body1" key={i}>{s}</Typography>)
          }
        </div>
      )
    }
  }
}

export default NoteView;