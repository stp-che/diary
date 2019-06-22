import {Note} from "../models/Note"
import Repo from "./Repo"

export default {
  init: (ipcMain: any) => {

    ipcMain.on('/notes/save', async (event: any, _note: Note) => {
      try {
        const note = await Repo.Note.create(_note);
        await Repo.Note.save(note);
        // event.returnValue = await itemRepo.find();
        // event.sender.send("note-saved", new Note({id: 1, text: _note.text}))
        // console.log("/notes/save", _note);
      } catch (err) {
        throw err;
      }
    });
  }
}