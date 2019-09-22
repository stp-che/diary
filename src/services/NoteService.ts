import {ipcRenderer} from 'electron'
import {Note} from "../models/Note"

const NoteService = {
  saveNote: (note: Note) => {
    console.log('NoteService.saveNote', note);
    ipcRenderer.send('/notes/save', note);
  },
  getNotes: (): Note[] => {
    return ipcRenderer.sendSync('/notes/list').map(n => new Note(n));
  }
};

// ipcRenderer.on('note-saved', (e: any, note: Note) => {
//   console.log('note saved: ', note);
// });

export default NoteService;