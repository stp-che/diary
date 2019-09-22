import {ipcRenderer} from 'electron'
import {Note} from "../models/Note"

const NoteService = {
  saveNote: (note: Note): Note => {
    // console.log('NoteService.saveNote', note);
    return new Note(ipcRenderer.sendSync('/notes/save', note));
  },
  getNotes: (): Note[] => {
    return ipcRenderer.sendSync('/notes/list').map(n => new Note(n));
  }
};

// ipcRenderer.on('note-saved', (e: any, note: Note) => {
//   console.log('note saved: ', note);
// });

export default NoteService;