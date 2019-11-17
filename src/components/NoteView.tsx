import * as React from 'react';
import {Note} from "../models/Note"
import NoteService from "../services/NoteService"

// import { withStyles } from '@material-ui/styles';
import { Typography, Button } from "@material-ui/core"

import NoteEditor from "./NoteEditor"

import * as MarkdownIt from "markdown-it";

import {replace as replaceTags} from '../lib/Tags';


function formatNoteText(text: string): string {
  return (new MarkdownIt({html: true})).render(
    replaceTags(text, tag => `<a href="#/tags/${tag}">#${tag}</a>`)
  );
};

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
    // console.log((new MarkdownIt({html: true})).parseInline(note.text || ""));
    if (this.state.edit) {
      return <NoteEditor note={note} afterSave={this.afterSave} />
    } else {
      return (
        <div>
          <Button variant="contained" onClick={this.edit}>Edit</Button>
          <Typography variant="h5">{note.title}</Typography>
          <Typography variant="subtitle1">{note.date.toLocaleDateString()}</Typography>
          <div dangerouslySetInnerHTML={ {__html: formatNoteText(note.text || "")} } />
        </div>
      )
    }
  }
}

export default NoteView;